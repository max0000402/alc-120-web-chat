export interface Message {
    id: number,
    senderId: number,
    payload: string,
    createdAt: number,
    groupId: number
}