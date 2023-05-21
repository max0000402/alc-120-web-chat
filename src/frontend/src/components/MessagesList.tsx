import { Card, Col, Row } from 'react-bootstrap'
import React, { useEffect, useRef } from 'react'
import { useGetMessagesQuery } from '../services/chatService'
import { useAppSelector } from '../store/hooks'
import { isUserAuth } from '../store/features/auth/selectors'
import MessageUserInfo from './MessageUserInfo'

export default function MessagesList() {

    const isAuth = useAppSelector(isUserAuth)
    const selectedGroup = useAppSelector(state => state.chat.selectedGroup)
    const { data: messages } = useGetMessagesQuery(selectedGroup!, { skip: !isAuth || selectedGroup === undefined })

    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messages === undefined) {
            return
        }

        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    if (!isAuth || !selectedGroup) {
        return (
            <Row className="messages-list gap-2">

            </Row>
        )
    }

    return (
        <Row className="messages-list gap-2">
            {messages !== undefined && messages.map(el => (
                <Col key={el.id} sm={12}>
                    <Card>
                        <Card.Header>
                            <MessageUserInfo userId={el.senderId} />
                        </Card.Header>
                        <Card.Body>
                            {el.payload}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            <div ref={endRef} />
        </Row>
    )
}