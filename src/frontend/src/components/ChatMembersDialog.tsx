import React from 'react'
import { Card, Form, FormGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'
import { UserDetail } from '../viewmodels/user'

interface ChatMemberDialogProps extends DialogType {
    name: string,
    members: UserDetail[]
}

export default function ChatMembersDialog(props: ChatMemberDialogProps) {
    return (
        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column gap-2">
                    <Form>

                    <Card className="d-flex ">
                        <Card.Header>
                            <span>Add new member</span>
                                <FormGroup>
                                    <Form.Label for="new-member-input">Login</Form.Label>
                                    <Form.Control id="new-member-input" type="text"></Form.Control>
                                </FormGroup>
                        </Card.Header>
                        <Card.Footer>
                            <Button variant="success">Invite</Button>
                        </Card.Footer>
                    </Card>
                    </Form>

                    <Card className="d-flex ">
                        <Card.Header>
                            <span>Max Korolyov</span>
                        </Card.Header>
                        <Card.Body>
                            <Button size="sm" variant="outline-danger">Kick</Button>
                        </Card.Body>
                    </Card>
                    <Card className="d-flex ">
                        <Card.Header>
                            <span>Max Korolyov</span>
                        </Card.Header>
                        <Card.Body>
                            <Button size="sm" variant="outline-danger">Kick</Button>
                        </Card.Body>
                    </Card>
                    <Card className="d-flex ">
                        <Card.Header>
                            <span>Max Korolyov</span>
                        </Card.Header>
                        <Card.Body>
                            <Button size="sm" variant="outline-danger">Kick</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
 }