export interface Message {
    id: number,
    senderId: number,
    payload: string,
    createdAt: number,
    groupId: number
}

export interface MessageRequest {
    roomId: number,
    message: string
}