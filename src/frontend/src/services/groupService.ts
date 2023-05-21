import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../common/constants'
import { GroupDetail } from '../viewmodels/group'
import { RootState } from '../store'

export const groupService = createApi({
    reducerPath: 'groupService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/group`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getGroupById: builder.query<GroupDetail, number>({
            query: (id) => `${id}`
        }),
        getGroupForCurrentUser: builder.query<GroupDetail[], void>({
            query: () => `current`
        })
    })
})

export const { useGetGroupByIdQuery, useGetGroupForCurrentUserQuery } = groupService