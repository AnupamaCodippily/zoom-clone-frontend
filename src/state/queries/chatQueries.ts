import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ZOOM_CLONE_SERVER_URL } from "../../lib/constants/urls";
import setupSocketIOForMessages, {
  ISocket,
  setupSocketListeners,
} from "../../lib/sockets/setupSocketIO";
import { getPeer, peerId } from "../../lib/webrtc/create-peerjs-connection";
import IChatMessage from "../../types/Message";

export type Room = string;

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ZOOM_CLONE_SERVER_URL ?? ""}),
  endpoints: (build) => ({
    getMessages: build.query<IChatMessage[] | null, Room>({
      queryFn: async () => ({ data: null }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts (here we use socket.io)
        const socket: ISocket | undefined = setupSocketIOForMessages();
        getPeer();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          if (!socket) throw Error('unable to setup chat');

          setupSocketListeners(socket, updateCachedData);
          
          socket.emit('client-connected-to-meeting', { clientId: peerId, meetingRoomName: 'default-classroom' })
        } catch {
          console.log("An error occured when setting up a socket");
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket?.close();
      },
    }),

    sendMessage: build.mutation<any, IChatMessage>({
      queryFn: (chatMessageContent: IChatMessage) => {
        const socket = setupSocketIOForMessages();

        return new Promise((resolve) => {
          socket?.emit(
            "client-send-message-to-server",
            chatMessageContent,
            (message: IChatMessage) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
  }),
});
