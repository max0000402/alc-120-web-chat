import { createSlice } from '@reduxjs/toolkit'
import { fetchUserById } from './fetchUserById'
import { UserDetail } from '../../../viewmodels/user'
import { Status } from '../../helpers'

export interface AuthState {
    user?: UserDetail,
    token: string,
    status: Status
}

const initialState: AuthState = {
    user: undefined,
    token: '',
    status: 'pending'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = undefined
            state.status = 'fulfilled'
            state.token = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.user = {
                name: action.payload.name,
                login: action.payload.login,
                id: action.payload.id
            }
            state.status = 'fulfilled'
        })
        builder.addCase(fetchUserById.rejected, (state) => {
            state.status = 'rejected'
        })
        builder.addCase(fetchUserById.pending, (state) => {
            state.status = 'pending'
        })
    }
})

export const {  } = authSlice.actions

export default authSlice.reducer