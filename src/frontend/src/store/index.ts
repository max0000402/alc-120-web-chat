import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { userService } from '../services/userService'
import { authService } from '../services/authService'
import { groupService } from '../services/groupService'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userService.reducerPath]: userService.reducer,
        [authService.reducerPath]: authService.reducer,
        [groupService.reducerPath]: groupService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(authService.middleware)
            .concat(groupService.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
