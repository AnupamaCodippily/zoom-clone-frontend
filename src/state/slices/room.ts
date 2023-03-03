import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Participant from "../../types/Participant";

export interface RoomState {
  isMainPresenter: boolean;
  isHost: boolean;
  isMicOn: boolean;
  isCamOn: boolean;
  isScreenShared: boolean;
  playingMediaStream: MediaStream | null;
  participants: Participant[];
  displayingRemoteStream: boolean;
  hostState: {
    isHostMicOn: boolean;
    isHostCamOn: boolean;
    isHostScreenShared: boolean;
  };
}

const initialState: RoomState = {
  isMainPresenter: true,
  isHost: false,
  isMicOn: false,
  isCamOn: false,
  isScreenShared: false,
  playingMediaStream: null,
  participants: [],
  displayingRemoteStream: false,
  hostState: {
    isHostMicOn: false,
    isHostCamOn: false,
    isHostScreenShared: false,
  },
};

export type MediaStreamMetaData = {
  audio: boolean;
  video: boolean;
  screenshare: boolean;
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setAsMainPresenter: (state, action: PayloadAction<boolean>) => {
      state.isMainPresenter = action.payload;
    },
    setAsHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants.push(action.payload);
    },

    removeParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants = state.participants.filter(
        (participant: Participant) => participant.id !== action.payload.id
      );
    },

    setMicOn: (state: RoomState, action: PayloadAction<boolean>) => {
      state.isMicOn = action.payload;
    },

    setPlayingMediaStream: (
      state: RoomState,
      action: PayloadAction<MediaStreamMetaData>
    ) => {
      // stop any active streams
      // state.playingMediaStream?.getTracks().forEach(function (track) {
      //   track.stop();
      // });

      // // set the mediastream
      // state.playingMediaStream = action.payload.mediaStream;

      if (state.displayingRemoteStream) {
        state.isCamOn = false;
        state.isMicOn = false;
        state.isScreenShared = false;
      } else {
        // apply other settings
        state.isCamOn = action.payload.video;
        state.isMicOn = action.payload.audio;
        state.isScreenShared =
          action.payload.screenshare && !action.payload.video; // prevent both happening at the same time
      }
    },

    setIsDisplayingRemoteStream: (
      state: RoomState,
      action: PayloadAction<boolean>
    ) => {
      state.displayingRemoteStream = action.payload;
    },
    setHostState: (
      state: RoomState,
      action: PayloadAction<{
        isHostCamOn: boolean;
        isHostScreenShared: boolean;
        isHostMicOn: boolean;
      }>
    ) => {
      if (!state.isHost) state.hostState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAsHost,
  setAsMainPresenter,
  setPlayingMediaStream,
  addParticipant,
  removeParticipant,
  setMicOn,
  setIsDisplayingRemoteStream,
  setHostState
} = roomSlice.actions;

export default roomSlice.reducer;
