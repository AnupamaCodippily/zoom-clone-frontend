import { createApi, fetchBaseQuery, QueryDefinition } from "@reduxjs/toolkit/query/react";
import { ZOOM_CLONE_SERVER_ROOM_BASE_URL } from "../../lib/constants/urls";
import setupSocketIOForMessages, {
  ISocket,
  setupSocketListeners,
} from "../../lib/sockets/setupSocketIO";

export type Room = string;

export interface Message {
  id: number;
  roomId: Room;
  userName: string;
  text: string;
}

export const api: any = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ZOOM_CLONE_SERVER_ROOM_BASE_URL }),
  endpoints: (build) => ({
    getMessages: build.query<Message[], Room>({
      query: (roomId) => `/`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        console.log(1)
        // create a websocket connection when the cache subscription starts (here we use socket.io)
        const socket: ISocket = setupSocketIOForMessages();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          setupSocketListeners(socket, updateCachedData);

          console.log(socket)
        } catch  {
          console.log(2)
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.close();
      },
    }),

    sendMessage: build.mutation<Message, string>({
      queryFn: (chatMessageContent: string) => {
        const socket = setupSocketIOForMessages();
        return new Promise((resolve) => {
          socket.emit(
            "client-send-message-to-server",
            chatMessageContent,
            (message: Message) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
  }),
});


export const selectMessagesResult = api.endpoints.getMessages.select();
