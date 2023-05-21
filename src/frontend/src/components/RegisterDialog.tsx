import React, { useCallback, useState } from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'
import { useAppDispatch } from '../store/hooks'
import { RegisterRequest } from '../viewmodels/auth'
import { useRegisterMutation } from '../services/authService'
import { setToken } from '../store/features/auth/authSlice'

interface RegisterDialogProps extends DialogType {

}

export default function RegisterDialog(props: RegisterDialogProps) {
    const [register] = useRegisterMutation()
    const dispatch = useAppDispatch()
    const [state, setState] = useState<RegisterRequest>({
        login: '',
        password: '',
        name: ''
    })

    const updateState = useCallback(<T extends typeof state, K extends keyof T>(key: K, value: T[K]) => {
        setState(prevState => ({ ...prevState, [key]: value }))
    }, [])

    const submitForm = useCallback(async () => {
        try {
            const token = await register(state).unwrap()
            dispatch(setToken(token.token))
            setState({ login: '', password: '', name: '' })
            props.handleClose()
        } catch (e) {
            console.error(e)
            updateState('password', '')
        }
    }, [props.handleClose, state])

    return (
        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label htmlFor="login-input">Login</Form.Label>
                        <Form.Control value={state.login} onChange={(e) => updateState('login', e.target.value)} type="text" id="login-input"></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="login-input">Name</Form.Label>
                        <Form.Control value={state.name} onChange={(e) => updateState('name', e.target.value)} type="text" id="login-input"></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="password-input">Password</Form.Label>
                        <Form.Control value={state.password} onChange={(e) => updateState('password', e.target.value)} type="password" id="password-input"></Form.Control>
                    </FormGroup>
                    <Button onClick={submitForm} type="button" variant="primary">Register</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}