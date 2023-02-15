import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    authJwtToken: string;
    authErrorState : boolean;
}

const initialState: AuthState = {
    authJwtToken: '',
    authErrorState: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthJwtToken: (state, action: PayloadAction<string>) => {
        state.authJwtToken = action.payload;
    },
    setAuthErrorState: (state: AuthState, action: PayloadAction<boolean>) => {
        state.authErrorState = action.payload;
    }
  },
})


export const { setAuthJwtToken, setAuthErrorState } = authSlice.actions

export default authSlice.reducer