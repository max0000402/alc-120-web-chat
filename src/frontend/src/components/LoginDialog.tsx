import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'

interface LoginDialogProps extends DialogType {

}

export default function LoginDialog(props: LoginDialogProps) {
    return (
        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label htmlFor="login-input">Login</Form.Label>
                        <Form.Control type="text" id="login-input"></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="password-input">Password</Form.Label>
                        <Form.Control type="password" id="password-input"></Form.Control>
                    </FormGroup>
                    <Button type="submit" variant="primary">Login</Button>
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