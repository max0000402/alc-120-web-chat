import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDetail } from '../../../viewmodels/user'
import { Status } from '../../helpers'

export interface AuthState {
    token: string,
}

const initialState: AuthState = {
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
        },
        setToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload
        }
    },
})

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer