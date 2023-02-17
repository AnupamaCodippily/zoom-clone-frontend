import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../lib/constants/user-types";

export interface AuthState {
  authJwtToken: string;
  authErrorState: boolean;
  userType: UserType;
}

const initialState: AuthState = {
  authJwtToken: "",
  authErrorState: false,
  userType: UserType.GUEST,
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
    setUserType: (state:AuthState, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    }
  },
});

export const { setAuthJwtToken, setAuthErrorState ,setUserType} = authSlice.actions;

export default authSlice.reducer;
