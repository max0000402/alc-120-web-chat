import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../common/constants'
import { GroupDetail } from '../viewmodels/group'

export const groupService = createApi({
    reducerPath: 'groupService',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getGroupById: builder.query<GroupDetail, number>({
            query: (id) => `group/${id}`,
        }),
        getGroupForCurrentUser: builder.query<GroupDetail[], void>({
            query: () => `groups`
        })
    }),
})

export const { useGetGroupByIdQuery } = groupService