import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ZOOM_CLONE_SERVER_URL } from "../../lib/constants/urls";
import setupSocketIOForMessages, {
  ISocket,
  setupSocketListeners,
} from "../../lib/sockets/setupSocketIO";
import { getPeer, peerId } from "../../lib/webrtc/create-peerjs-connection";
import IChatMessage from "../../types/Message";
import room, { RoomState } from "../slices/room";
import { store } from "../store";

export type Room = string;

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ZOOM_CLONE_SERVER_URL ?? "" }),
  endpoints: (build) => ({
    getMessages: build.query<IChatMessage[] | null, Room>({
      queryFn: async () => ({ data: null }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts (here we use socket.io)
        const socket: ISocket | undefined = setupSocketIOForMessages();
        const _ = getPeer();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          if (!socket) throw Error("unable to setup chat");

          setupSocketListeners(socket, updateCachedData);

          socket.emit("host-connected-to-meeting", {
            clientId: peerId,
            meetingId: store.getState().auth.roomName,
          });
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
        const { id, meetingName, messageBody, roomId, senderName } =
          chatMessageContent;
        return new Promise((resolve) => {
          socket?.emit(
            "client-send-message-to-server",
            { id, meetingName, messageBody, roomId, senderName },
            (message: IChatMessage) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),

    startMeeting: build.mutation<any, null>({
      queryFn: ({ title, meetingId }: any) => {
        const socket = setupSocketIOForMessages();
        const hostPeerId = peerId;
        return new Promise((resolve) => {
          socket?.emit(
            "host-started-meeting",
            { title, meetingId, hostPeerId },
            (message: any) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),

    studentJoinMeeting: build.mutation<any, null>({
      queryFn: ({ meetingId }: any) => {
        const socket = setupSocketIOForMessages();
        const _peerId = peerId;
        const name = store.getState().auth.username;
        return new Promise((resolve) => {
          socket?.emit(
            "student-joined-meeting",
            { meetingId, studentPeerId: _peerId, name },
            (message: any) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),

    hostStartCamOn: build.mutation<any, null>({
      queryFn: ({ meetingId }: any) => {
        const socket = setupSocketIOForMessages();
        return new Promise((resolve) => {
          const roomState: RoomState = store.getState().room;
          const { isCamOn, isMicOn, isScreenShared, displayingRemoteStream } =
            roomState;
          socket?.emit(
            "host-turned-on-camera",
            {
              meetingId,
              hostPeerId: peerId,
              meetingSettings: {
                isCamOn,
                isMicOn,
                isScreenShared,
                displayingRemoteStream,
              },
            },
            (message: any) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
  }),
});
