import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IChatMessage from '../../types/Message'

export interface ChatState {
    chatMessages: IChatMessage[]
}

const initialState: ChatState = {
    chatMessages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageToChat: (state, action: PayloadAction<IChatMessage>) => {
        state.chatMessages.push(action.payload);
    }
  },
})


export const { addMessageToChat } = chatSlice.actions

export default chatSlice.reducer