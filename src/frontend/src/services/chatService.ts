import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../common/constants'
import { GroupDetail } from '../viewmodels/group'
import { RootState } from '../store'
import { Message, MessageRequest } from '../viewmodels/message'
import * as signalR from '@microsoft/signalr'

export const chatService = createApi({
    reducerPath: 'chatService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/chat`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        sendMessage: builder.mutation<undefined, MessageRequest>({
            query: (message) => ({
                url: '',
                body: message,
                method: 'POST'
            })
        }),
        getMessages: builder.query<Message[], number>({
            query: (groupId) => ({
                url: `?groupId=${groupId}`
            }),
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
            ) {
                const token = (getState() as RootState).auth.token

                let connection = new signalR.HubConnectionBuilder()
                    .withUrl("/chathub", {
                        accessTokenFactory: () => token
                    })
                    .build();

                try {
                    await cacheDataLoaded
                    connection.on("Receive", (message) => {
                        if (!message) { return }
                        // if (message.groupId !== arg) { return }

                        updateCachedData((draft) => {
                            draft.push(message)
                        })
                    });
                    await connection.start()

                } catch {
                }
                await cacheEntryRemoved
                connection.stop()
            },
        })
    })
})

export const { useSendMessageMutation, useGetMessagesQuery } = chatService