import React, { useCallback, useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Card, Col, Form, FormGroup, ListGroup, Row } from 'react-bootstrap'
import ChatMembersDialog from './components/ChatMembersDialog'
import LoginDialog from './components/LoginDialog'

function App() {

    const [isMemberDialogOpen, setMemberDialogOpen] = useState(false)
    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)

    const handleMemberDialogClose = useCallback(() => setMemberDialogOpen(false), [])
    const handleLoginDialogClose = useCallback(() => setLoginDialogOpen(false), [])

    return (
        <>
            <ChatMembersDialog name="Dialog 1" members={[]} isOpen={isMemberDialogOpen} handleClose={handleMemberDialogClose} />
            <LoginDialog isOpen={isLoginDialogOpen} handleClose={handleLoginDialogClose} />
            <Navbar className="mb-2" bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand>MyRoom</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link as="span">ChatName</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setMemberDialogOpen(true)}>6 members(open modal on click)</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setLoginDialogOpen(true)}>Login/Username</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="d-flex w-100 group-list">
                <ListGroup className="group-list">
                    <ListGroup.Item action>Chat 1</ListGroup.Item>
                    <ListGroup.Item action>Chat 2</ListGroup.Item>
                    <ListGroup.Item action>Chat 3</ListGroup.Item>
                </ListGroup>
                <Container>
                    <div className="d-flex flex-column justify-content-between chat-window">
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Body>
                                        Test message
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="message-box">
                            <Form>
                                <FormGroup>
                                    <Form.Label for="area-message">New message</Form.Label>
                                    <Form.Control id="area-message" as="textarea" rows={3}></Form.Control>
                                </FormGroup>
                                <Button className="mt-2" variant="primary">Отправить</Button>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default App
