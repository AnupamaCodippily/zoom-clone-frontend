import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    chatMessages: string[]
}

const initialState: ChatState = {
    chatMessages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageToChat: (state, action: PayloadAction<string>) => {
        state.chatMessages.push(action.payload);
    }
  },
})


export const { addMessageToChat } = chatSlice.actions

export default chatSlice.reducer