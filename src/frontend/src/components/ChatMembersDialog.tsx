import React from 'react'
import { Card, Form, FormGroup, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { DialogType } from '../common/DialogType'
import { UserDetail } from '../viewmodels/user'
import { GroupDetail } from '../viewmodels/group'
import MessageUserInfo from './MessageUserInfo'
import { useLeftFromGroupMutation } from '../services/groupService'
import { clearGroupSelection } from '../store/features/chat/chatSlice'
import { useAppDispatch } from '../store/hooks'

interface ChatMemberDialogProps extends DialogType {
    group: GroupDetail
}

export default function ChatMembersDialog(props: ChatMemberDialogProps) {
    const dispatch = useAppDispatch()
    const [left] = useLeftFromGroupMutation()
    return (
        <Modal show={props.isOpen} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.group.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column gap-2">
                    <Form>

                    {/*<Card className="d-flex ">*/}
                    {/*    <Card.Header>*/}
                    {/*        <span>Add new member</span>*/}
                    {/*            <FormGroup>*/}
                    {/*                <Form.Label htmlFor="new-member-input">Login</Form.Label>*/}
                    {/*                <Form.Control id="new-member-input" type="text"></Form.Control>*/}
                    {/*            </FormGroup>*/}
                    {/*    </Card.Header>*/}
                    {/*    <Card.Footer>*/}
                    {/*        <Button variant="success">Invite</Button>*/}
                    {/*    </Card.Footer>*/}
                    {/*</Card>*/}
                    </Form>

                    {props.group.membersId.map(el => (
                        <Card key={el} className="d-flex ">
                            <Card.Header>
                                <MessageUserInfo userId={el} />
                            </Card.Header>
                        </Card>
                    ))}


                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    left(props.group.id)
                        .then(() => {
                            props.handleClose()
                            dispatch(clearGroupSelection())
                        })
                        .catch(() => console.error('Error when leaving'))
                }}>
                    Leave
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
 }