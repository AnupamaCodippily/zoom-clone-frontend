import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../lib/constants/user-types";

export interface AuthState {
  authJwtToken: string;
  authErrorState: boolean;
  userType: UserType;
  username: string;
  roomName: string;
  meetingTitle: string;
}

const initialState: AuthState = {
  authJwtToken: "",
  authErrorState: false,
  userType: UserType.GUEST,
  username: "INVALID_USER",
  roomName: "",
  meetingTitle: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthJwtToken: (state, action: PayloadAction<string>) => {
      state.authJwtToken = action.payload;
    },
    setAuthErrorState: (state: AuthState, action: PayloadAction<boolean>) => {
      state.authErrorState = action.payload;
    },
    setUserType: (state: AuthState, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    setRoomName: (state: AuthState, action: PayloadAction<string>) => {
      state.roomName = action.payload;
    },
    setUserName: (state: AuthState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setMeetingTitle: (state: AuthState, action: PayloadAction<string>) => {
      state.meetingTitle = action.payload;
    }
  },
});

export const { setAuthJwtToken, setAuthErrorState, setUserType, setRoomName, setUserName, setMeetingTitle } =
  authSlice.actions;

export default authSlice.reducer;
