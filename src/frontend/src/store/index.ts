import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import authReducer, { logout, setToken } from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import { userService } from '../services/userService'
import { authService } from '../services/authService'
import { groupService } from '../services/groupService'
import { chatService } from '../services/chatService'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        [userService.reducerPath]: userService.reducer,
        [authService.reducerPath]: authService.reducer,
        [groupService.reducerPath]: groupService.reducer,
        [chatService.reducerPath]: chatService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(authService.middleware)
            .concat(groupService.middleware)
            .concat(chatService.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
