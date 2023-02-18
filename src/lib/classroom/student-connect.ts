import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";
import { CLASSROOMS_SERVER_BASE_URL } from "../constants/urls";

export async function checkClassroom(code: string) {
    const resultJson = await fetch(CLASSROOMS_SERVER_BASE_URL + "/" + code);
    const result = await resultJson.json()

    return result.classroom?.exists;
}

export async function studentSendMessageToChatroom(message: string) {
    store.dispatch(api.endpoints.sendMessage.initiate({ meetingId: store.getState().room.roomName , messageBody: message}));
}