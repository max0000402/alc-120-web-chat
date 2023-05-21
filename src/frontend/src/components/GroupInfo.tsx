import Nav from 'react-bootstrap/Nav'
import React, { useCallback, useState } from 'react'
import ChatMembersDialog from './ChatMembersDialog'
import { useGetGroupByIdQuery } from '../services/groupService'
import { useAppSelector } from '../store/hooks'
import { isUserAuth } from '../store/features/auth/selectors'

export default function GroupInfo() {
    const isAuth = useAppSelector(isUserAuth)
    const selectedGroup = useAppSelector(state => state.chat.selectedGroup)
    const [isMemberDialogOpen, setMemberDialogOpen] = useState(false)
    const handleMemberDialogClose = useCallback(() => setMemberDialogOpen(false), [])

    const { data, isLoading, isError } = useGetGroupByIdQuery(selectedGroup!, { skip: selectedGroup === undefined })

    if (!isAuth) {
        return (<></>)
    }

    if (selectedGroup === undefined) {
        return (
            <Nav>
                <Nav.Link as="span">Чат не выбран</Nav.Link>
            </Nav>
        )
    }

    if (isLoading) {
        return (<span>Загрузка</span>)
    }

    if (isError) {
        return (<span>Ошибка</span>)
    }

    if (data === undefined) {
        return (<span>Не удалось получить информацию</span>)
    }

    return (
        <>
            <ChatMembersDialog group={data} isOpen={isMemberDialogOpen}
                               handleClose={handleMemberDialogClose}/>

            <Nav>
                <Nav.Link as="span">{data.name}</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link onClick={() => setMemberDialogOpen(true)}>{data.membersId.length} members</Nav.Link>
            </Nav>
        </>
    )
}