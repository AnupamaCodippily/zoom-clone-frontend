import { createListenerMiddleware } from "@reduxjs/toolkit";
import emitMessageToServer from "../../lib/sockets/socketActions";
import { addMessageToChat } from "../slices/chat";

const newMessageListenerMiddleware = createListenerMiddleware();

newMessageListenerMiddleware.startListening({
    actionCreator: addMessageToChat,
    effect : async (action, listenerApi) => {
        // console.log('Todo added: ', action.payload.text) 

        listenerApi.cancelActiveListeners()

        // const {message, username} = action.payload;

        // emitMessageToServer(username, message);
    }
})