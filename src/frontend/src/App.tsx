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
import { groupService, useGetGroupForCurrentUserQuery } from './services/groupService'
import { logout } from './store/features/auth/authSlice'
import * as signalR from '@microsoft/signalr'
import { chatService, useGetMessagesQuery, useSendMessageMutation } from './services/chatService'
import { clearGroupSelection, selectGroup } from './store/features/chat/chatSlice'
import MessagesList from './components/MessagesList'
import GroupInfo from './components/GroupInfo'
import GroupList from './components/GroupList'
import LandingComponent from './components/LandingComponent'

function App() {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(isUserAuth)
    const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !isAuth })
    const { data: groups } = useGetGroupForCurrentUserQuery(undefined, { skip: !isAuth })

    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)
    const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false)

    const handleLoginDialogClose = useCallback(() => setLoginDialogOpen(false), [])
    const handleRegisterDialogClose = useCallback(() => setRegisterDialogOpen(false), [])

    const [send] = useSendMessageMutation()


    const selectedGroup = useAppSelector(state => state.chat.selectedGroup)
    const { data: messages } = useGetMessagesQuery(selectedGroup!, { skip: !isAuth || selectedGroup === undefined })

    const [newMessage, setNewMessage] = useState('')
    const sendMessage = useCallback(async () => {
        await send({ message: newMessage, roomId: selectedGroup! })
        setNewMessage('')
    }, [newMessage, selectedGroup])
    return (
        <>
            <LoginDialog isOpen={isLoginDialogOpen} handleClose={handleLoginDialogClose}/>
            <RegisterDialog isOpen={isRegisterDialogOpen} handleClose={handleRegisterDialogClose}/>
            <Navbar className="mb-2" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className="cursor-pointer" onClick={() => dispatch(clearGroupSelection())}>
                        <svg width="800px" height="800px" viewBox="0 0 1024 1024" fill="#000000" className="icon"
                             version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M788 946.4c-11.2 0-20.8-8.8-20.8-20v-21.6H256.8v21.6c0 11.2-9.6 20-20.8 20-11.2 0-20.8-8.8-20.8-20V904l-2.4-0.8c-43.2-8-74.4-44-74.4-86.4v-200l0.8-22.4h-2.4C60 584 3.2 519.2 3.2 445.6c0-76 59.2-140 136.8-149.6h2.4v-77.6c0-64.8 36-130.4 116-130.4h512c31.2 0 58.4 10.4 78.4 30.4 23.2 23.2 36 59.2 36 100l0.8 77.6h2.4c75.2 11.2 132 75.2 132 148.8 0 73.6-57.6 137.6-132.8 148.8h-2.4l0.8 22.4v200.8c0 42.4-31.2 78.4-74.4 86.4l-2.4 0.8v22.4c-0.8 11.2-9.6 20-20.8 20zM160 334.4c-64 0-116 50.4-116 111.2s52 112 116 112c5.6 0 11.2 2.4 14.4 5.6 4 4 5.6 8.8 5.6 14.4l-0.8 40.8v200c0 26.4 22.4 48.8 50.4 48.8h564c28 0 50.4-21.6 50.4-48.8v-200l-0.8-40.8c0-5.6 1.6-10.4 5.6-14.4 4-4 8.8-5.6 14.4-5.6 64 0 116-49.6 116-111.2s-51.2-112-115.2-112c-63.2 0-115.2 49.6-116 110.4l1.6 20v202.4c0 11.2-9.6 20-20.8 20H294.4c-11.2 0-20.8-8.8-20.8-20V466.4v-1.6l1.6-19.2c0-61.6-52-111.2-115.2-111.2zM266.4 136c-49.6 0-71.2 44-71.2 87.2v76l2.4 0.8c64.8 11.2 114.4 60.8 123.2 123.2V640H704V422.4c9.6-62.4 62.4-113.6 128-123.2h2.4V224c0-43.2-21.6-87.2-70.4-87.2H266.4z"
                                fill=""/>
                        </svg>
                        MyRoom
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <GroupInfo/>
                        {isAuth && currentUser !== undefined
                            ? (<Nav>
                                <Nav.Link as="span">{currentUser.name}</Nav.Link>
                                <Nav.Link onClick={() => {
                                    dispatch(logout())
                                    dispatch(chatService.util.resetApiState())
                                    dispatch(groupService.util.resetApiState())
                                    dispatch(clearGroupSelection())
                                }}>Logout</Nav.Link>
                            </Nav>)
                            : (<Nav>
                                <Nav.Link onClick={() => setLoginDialogOpen(true)}>Login</Nav.Link>
                                <Nav.Link onClick={() => setRegisterDialogOpen(true)}>Register</Nav.Link>
                            </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {isAuth
                ? (
                    <div className="d-flex w-100 group-list">
                        <GroupList/>
                        <Container>
                            <div className="d-flex flex-column justify-content-between chat-window">
                                <MessagesList/>
                                {selectedGroup &&
                                    <div className="message-box">
                                        <Form>
                                            <FormGroup>
                                                <Form.Label htmlFor="area-message">New message</Form.Label>
                                                <Form.Control
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    id="area-message"
                                                    as="textarea"
                                                    rows={3}
                                                    onKeyDown={async (e) => {
                                                        if (e.shiftKey && e.key === 'Enter') {
                                                            e.preventDefault()
                                                            await sendMessage()
                                                        }
                                                    }}></Form.Control>
                                            </FormGroup>
                                            <Button onClick={sendMessage} className="mt-2"
                                                    variant="primary">Отправить</Button>
                                        </Form>
                                    </div>
                                }
                            </div>
                        </Container>
                    </div>
                )
                : <LandingComponent/>
            }

        </>
    )
}

export default App
