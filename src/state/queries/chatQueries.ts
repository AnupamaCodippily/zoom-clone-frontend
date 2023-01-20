import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ZOOM_CLONE_SERVER_ROOM_BASE_URL } from '../../lib/constants/urls'
import setupSocketIOForMessages, { ISocket, setupSocketListeners } from '../../lib/sockets/setupSocketIO'

export type Channel = 'redux' | 'general'

export interface Message {
  id: number
  channel: Channel
  userName: string
  text: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ZOOM_CLONE_SERVER_ROOM_BASE_URL }),
  endpoints: (build) => ({
    getMessages: build.query<Message[], Channel>({
      query: (channel) => `${channel}/messages`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts (here we use socket.io)
        const socket : ISocket = setupSocketIOForMessages();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            // if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          setupSocketListeners(socket);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.close()
      },
    }),
  }),
})

export const { useGetMessagesQuery } = api