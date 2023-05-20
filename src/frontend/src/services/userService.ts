import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserDetail } from '../viewmodels/user'
import { baseUrl } from '../common/constants'

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getUserById: builder.query<UserDetail, number>({
            query: (id) => `user/${id}`,
        }),
    }),
})

export const { useGetUserByIdQuery } = userService