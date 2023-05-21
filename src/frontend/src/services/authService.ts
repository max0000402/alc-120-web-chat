import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../common/constants'
import { GroupDetail } from '../viewmodels/group'
import { RootState } from '../store'
import { LoginRequest, LoginResponse, RegisterRequest } from '../viewmodels/auth'
import { UserDetail } from '../viewmodels/user'

export const authService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['AuthorizedUser'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['AuthorizedUser']
        }),
        register: builder.mutation<LoginResponse, RegisterRequest>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['AuthorizedUser']
        }),
        getCurrentUser: builder.query<UserDetail, void>({
            query: () => 'current',
            providesTags: ['AuthorizedUser']
        }),
    }),
})

export const { useLoginMutation, useGetCurrentUserQuery, useRegisterMutation } = authService