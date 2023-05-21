import React, { useCallback, useState } from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'
import { useAppDispatch } from '../store/hooks'
import { LoginRequest } from '../viewmodels/auth'
import { useLoginMutation } from '../services/authService'
import { setToken } from '../store/features/auth/authSlice'

interface LoginDialogProps extends DialogType {

}

export default function LoginDialog(props: LoginDialogProps) {
    const [login] = useLoginMutation()
    const dispatch = useAppDispatch()
    const [state, setState] = useState<LoginRequest>({
        login: '',
        password: ''
    })

    const updateState = useCallback(<T extends typeof state, K extends keyof T>(key: K, value: T[K]) => {
        setState(prevState => ({ ...prevState, [key]: value }))
    }, [])

    const submitForm = useCallback(async () => {
        try {
            const token = await login(state).unwrap()
            dispatch(setToken(token.token))
            props.handleClose()
        } catch (e) {
            console.error(e)
            updateState('password', '')
        }

    }, [props, state])

    return (
        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label htmlFor="login-input">Login</Form.Label>
                        <Form.Control value={state.login} onChange={(e) => updateState('login', e.target.value)} type="text" id="login-input"></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="password-input">Password</Form.Label>
                        <Form.Control value={state.password} onChange={(e) => updateState('password', e.target.value)} type="password" id="password-input"></Form.Control>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submitForm} type="button" variant="primary">Login</Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
 }