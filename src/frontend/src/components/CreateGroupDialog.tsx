import React, { useCallback, useState } from 'react'
import { Form, FormGroup, ListGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { LoginRequest } from '../viewmodels/auth'
import { useGetCurrentUserQuery, useLoginMutation } from '../services/authService'
import { setToken } from '../store/features/auth/authSlice'
import { useCreateGroupMutation } from '../services/groupService'
import { GroupCreateRequest } from '../viewmodels/group'
import MessageUserInfo from './MessageUserInfo'
import { useLazyGetUserByIdQuery } from '../services/userService'
import { isUserAuth } from '../store/features/auth/selectors'

interface CreateGroupDialogProps extends DialogType {

}

export default function CreateGroupDialog(props: CreateGroupDialogProps) {
    const isAuth = useAppSelector(isUserAuth)
    const [create] = useCreateGroupMutation()
    const dispatch = useAppDispatch()
    const [state, setState] = useState<GroupCreateRequest>({
        name: '',
        membersId: []
    })

    const [userId, setUserId] = useState(0)
    const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery(undefined, { skip: !isAuth })
    const updateState = useCallback(<T extends typeof state, K extends keyof T>(key: K, value: T[K]) => {
        setState(prevState => ({ ...prevState, [key]: value }))
    }, [])

    const submitForm = useCallback(async () => {
        try {
            await create(state)
            setState({
                name: '',
                membersId: []
            })
            props.handleClose()
        } catch (e) {
            console.error(e)
        }

    }, [props, state])

    const [fetchUser] = useLazyGetUserByIdQuery()

    if (!isAuth) {
        return (<></>)
    }

    if (isLoading) {
        return (<span>Загрузка</span>)
    }

    if (isError) {
        return (<span>Ошибка</span>)
    }

    if (currentUser === undefined) {
        return (<span>Ошибка получения текущего пользователя</span>)
    }

    return (

        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Create group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label htmlFor="name-group-input">Name</Form.Label>
                        <Form.Control value={state.name} onChange={(e) => updateState('name', e.target.value)}
                                      type="text" id="name-group-input"></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="user-id-input">User id</Form.Label>
                        <Form.Control value={userId} onChange={(e) => setUserId(Number.parseInt(e.target.value))}
                                      type="number" id="user-id-input"></Form.Control>
                        <Button className="mt-2 mb-2" onClick={() => {
                            if (state.membersId.findIndex(member => member === userId) !== -1 || userId === currentUser.id) {
                                return
                            }
                            fetchUser(userId)
                                .then(user => {
                                    if (user.data === undefined) {
                                        throw new Error('user not found')
                                    }

                                    return user.data
                                })
                                .then(user => setState(prev => ({ ...prev, membersId: [...prev.membersId, user.id] })))
                                .catch(e => {
                                    console.error(e)
                                    setUserId(0)
                                })
                        }} variant="outline-primary">Try add</Button>
                    </FormGroup>
                    <ListGroup>
                        <ListGroup.Item className="d-flex align-items-center justify-content-between">
                            <span>You</span>
                            <Button variant="danger" disabled>Remove</Button>
                        </ListGroup.Item>
                        {state.membersId.map(el => (
                            <ListGroup.Item key={el} className="d-flex align-items-center justify-content-between">
                                <MessageUserInfo userId={el}/>
                                <Button variant="danger" onClick={() => setState(prev => ({
                                    ...state,
                                    membersId: [...state.membersId].filter(newMember => newMember !== el)
                                }))}>Remove
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mt-2" onClick={submitForm} type="button" variant="primary">Create</Button>

                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}