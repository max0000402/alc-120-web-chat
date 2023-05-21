import { ListGroup } from 'react-bootstrap'
import { selectGroup } from '../store/features/chat/chatSlice'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { isUserAuth } from '../store/features/auth/selectors'
import { useGetGroupForCurrentUserQuery } from '../services/groupService'
import CreateGroupDialog from './CreateGroupDialog'
import { chatService } from '../services/chatService'

export default function GroupList() {
    const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false)

    const isAuth = useAppSelector(isUserAuth)
    const { data: groups } = useGetGroupForCurrentUserQuery(undefined, { skip: !isAuth })
    const selectedGroup = useAppSelector(state => state.chat.selectedGroup)
    const dispatch = useAppDispatch()


    if (!isAuth) {
        return (
            <ListGroup className="group-list" />
        )
    }

    return (
        <>
            <CreateGroupDialog isOpen={isCreateGroupDialogOpen} handleClose={() => setCreateGroupDialogOpen(false)} />
            <ListGroup className="group-list">
                <ListGroup.Item action variant="success" onClick={() => setCreateGroupDialogOpen(true)}>Add</ListGroup.Item>
                {groups !== undefined && groups.map(el => (
                    <ListGroup.Item
                        active={el.id === selectedGroup}
                        onClick={() => {
                            dispatch(selectGroup(el.id))
                            dispatch(chatService.util.resetApiState())
                        }}
                        action
                        key={el.id}
                    >{el.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}