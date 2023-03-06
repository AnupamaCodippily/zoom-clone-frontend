import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Participant from "../../types/Participant";

export interface RoomState {
  isMainPresenter: boolean; // is this person the one sharing media that others see on the screen
  isHost: boolean; // is this person the meeting/room host
  isMicOn: boolean; // is this client's mic on. Important: We should be able to see the webcam stream (below) but not play the mic stream on the same client.
  isCamOn: boolean; // is this client's webcam on
  isScreenShared: boolean; // is this client's screen being shared
  participants: Participant[]; // list of non-host participants
  displayingRemoteStream: boolean; // are we displaying our own stream or a remote one?
  hostState: {   // if this is not the host, what state is the host in?.
    isHostMicOn: boolean;
    isHostCamOn: boolean;
    isHostScreenShared: boolean;
  };
}

const initialState: RoomState = {
  isMainPresenter: false,
  isHost: false,
  isMicOn: false,
  isCamOn: false,
  isScreenShared: false,
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

    setParticipantsList: (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
    },

    setMicOn: (state: RoomState, action: PayloadAction<boolean>) => {
      state.isMicOn = action.payload;
    },

    setPlayingMediaStream: (
      state: RoomState,
      action: PayloadAction<MediaStreamMetaData>
    ) => {
      if (state.displayingRemoteStream) {
        state.isCamOn = false;
        // state.isMicOn = false;
        state.isScreenShared = false;
      } else {
        // apply other settings
        state.isCamOn = action.payload.video;
        // state.isMicOn = action.payload.audio;
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
  setParticipantsList,
  addParticipant,
  removeParticipant,
  setMicOn,
  setIsDisplayingRemoteStream,
  setHostState
} = roomSlice.actions;

export default roomSlice.reducer;
