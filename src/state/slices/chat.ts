import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IChatMessage from "../../types/Message";

export interface ChatState {
  chatMessages: IChatMessage[];
}

const initialState: ChatState = {
  chatMessages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageToChat: (state, action: PayloadAction<IChatMessage>) => {
      state.chatMessages.push(action.payload);
    },
    updateMessageHistory: (state, action: PayloadAction<IChatMessage[]>) => {
      if (action.payload?.length > 1)
        state.chatMessages = action.payload?.concat(state.chatMessages);
    },
  },
});

export const { addMessageToChat, updateMessageHistory } = chatSlice.actions;

export default chatSlice.reducer;
