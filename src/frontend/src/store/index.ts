import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { userService } from '../services/userService'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userService.reducerPath]: userService.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
