import { createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../../api/userApi'

export const fetchUserById = createAsyncThunk(
    'users/fetchById',
    async (userId: number) => {
        return await userApi.fetchById(userId)
    }
)
