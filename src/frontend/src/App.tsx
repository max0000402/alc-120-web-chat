import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Card, Col, Form, FormGroup, ListGroup, Row } from 'react-bootstrap'
import ChatMembersDialog from './components/ChatMembersDialog'
import LoginDialog from './components/LoginDialog'
import { useAppDispatch, useAppSelector } from './store/hooks'
import RegisterDialog from './components/RegisterDialog'
import { useGetCurrentUserQuery } from './services/authService'
import { isUserAuth } from './store/features/auth/selectors'
import { useGetGroupForCurrentUserQuery } from './services/groupService'
import { logout } from './store/features/auth/authSlice'
import * as signalR from '@microsoft/signalr'
import { useGetMessagesQuery, useSendMessageMutation } from './services/chatService'
import { clearGroupSelection, selectGroup } from './store/features/chat/chatSlice'
import MessagesList from './components/MessagesList'
import GroupInfo from './components/GroupInfo'

function App() {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(isUserAuth)
    const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !isAuth })
    const { data: groups } = useGetGroupForCurrentUserQuery(undefined, { skip: !isAuth })

    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false)

    const handleLoginDialogClose = useCallback(() => setLoginDialogOpen(false), [])
    const handleRegisterDialogClose = useCallback(() => setRegisterDialogOpen(false), [])

    const [sendMessage] = useSendMessageMutation()


    const selectedGroup = useAppSelector(state => state.chat.selectedGroup)
    const { data: messages } = useGetMessagesQuery(selectedGroup!, { skip: !isAuth || selectedGroup === undefined })

    const [newMessage, setNewMessage] = useState('')

    return (
        <>
            <LoginDialog isOpen={isLoginDialogOpen} handleClose={handleLoginDialogClose}/>
            <RegisterDialog isOpen={isRegisterDialogOpen} handleClose={handleRegisterDialogClose}/>
            <Navbar className="mb-2" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className="cursor-pointer" onClick={() => dispatch(clearGroupSelection())}>MyRoom</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <GroupInfo />
                        {isAuth && currentUser !== undefined
                            ? (<Nav>
                                <Nav.Link as="span">{currentUser.name}</Nav.Link>
                                <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
                            </Nav>)
                            : (<Nav>
                                <Nav.Link onClick={() => setLoginDialogOpen(true)}>Login</Nav.Link>
                                <Nav.Link onClick={() => setRegisterDialogOpen(true)}>Register</Nav.Link>
                            </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="d-flex w-100 group-list">
                <ListGroup className="group-list">
                    {groups !== undefined && groups.map(el => (
                        <ListGroup.Item active={el.id === selectedGroup} onClick={() => dispatch(selectGroup(el.id))}
                                        action key={el.id}>{el.name}</ListGroup.Item>
                    ))}
                </ListGroup>
                <Container>
                    <div className="d-flex flex-column justify-content-between chat-window">
                        <MessagesList />
                        {selectedGroup &&
                            <div className="message-box">
                                <Form>
                                    <FormGroup>
                                        <Form.Label htmlFor="area-message">New message</Form.Label>
                                        <Form.Control value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                                      id="area-message" as="textarea" rows={3}></Form.Control>
                                    </FormGroup>
                                    <Button onClick={async () => {
                                        await sendMessage({ message: newMessage, roomId: selectedGroup! })
                                    }} className="mt-2" variant="primary">Отправить</Button>
                                </Form>
                            </div>
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

export default App
