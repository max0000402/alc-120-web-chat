import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    selectedGroup?: number
}

const initialState: ChatState = {
    selectedGroup: undefined
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectGroup(state, action: PayloadAction<number>) {
            state.selectedGroup = action.payload
        },
        clearGroupSelection(state) {
            state.selectedGroup = undefined
        }
    }
})

export const { selectGroup, clearGroupSelection } = chatSlice.actions

export default chatSlice.reducer