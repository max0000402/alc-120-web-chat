import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../common/constants'
import { GroupCreateRequest, GroupDetail } from '../viewmodels/group'
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
    tagTypes: ['CurrentGroups', 'Groups'],
    endpoints: (builder) => ({
        getGroupById: builder.query<GroupDetail, number>({
            query: (id) => `${id}`,
            providesTags: ['Groups']
        }),
        getGroupForCurrentUser: builder.query<GroupDetail[], void>({
            query: () => `current`,
            providesTags: ['CurrentGroups']
        }),
        createGroup: builder.mutation<undefined, GroupCreateRequest>({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CurrentGroups']
        }),
        leftFromGroup: builder.mutation<undefined, number>({
            query: (groupId) => ({
                url: `${groupId}/left`,
                method: 'PUT'
            }),
            invalidatesTags: ['CurrentGroups']
        })
    })
})

export const { useGetGroupByIdQuery, useGetGroupForCurrentUserQuery, useCreateGroupMutation, useLeftFromGroupMutation } = groupService