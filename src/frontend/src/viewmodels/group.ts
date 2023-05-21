export interface GroupDetail {
    id: number,
    name: string,
    membersId: number[],
    messagesId: []
}

export interface GroupCreateRequest {
    name: string,
    membersId: number[]
}