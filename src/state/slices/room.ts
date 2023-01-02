import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Participant from "../../types/Participant";

export interface RoomState {
  isMainPresenter: boolean;
  isHost: boolean;
  isMuted: boolean;
  isCamOn: boolean;
  isScreenShared: boolean;
  selfCameraStream: MediaStream | null;
  participants: Participant[];
}

const initialState: RoomState = {
  isMainPresenter: true,
  isHost: false,
  isMuted: false,
  isCamOn: false,
  isScreenShared: false,
  selfCameraStream: null,
  participants: [],
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
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setCamOn: (state, action: PayloadAction<boolean>) => {
      state.isCamOn = action.payload;
    },
    setLocalCam: (state, action: PayloadAction<MediaStream | null>) => {
      if (!action.payload) {
        state.selfCameraStream?.getTracks().forEach(function (track) {
          track.stop();
        });
      }

      state.selfCameraStream = action.payload;
    },
    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants.push(action.payload);
    },

    removeParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants = state.participants.filter(
        (participant: Participant) => participant.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAsHost,
  setAsMainPresenter,
  setMuted,
  setCamOn,
  setLocalCam,
} = roomSlice.actions;

export default roomSlice.reducer;
