import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";
import {
  CLASSROOMS_SERVER_CHECK_URL,
} from "../constants/urls";
import { setMeetingTitle } from "../../state/slices/auth";

export async function checkClassroom(code: string) {
  const resultJson = await fetch(CLASSROOMS_SERVER_CHECK_URL + "/" + code, {
    method: "get",
    headers: {
      Authorization: "Bearer " + store.getState().auth.authJwtToken,
      'Content-type': 'application/json'
    },
  });
  const result = await resultJson.json();
  
  if (result.exists) {
    store.dispatch(setMeetingTitle(result.meetingName));
  }

  return result.exists;
}

export async function studentSendMessageToChatroom(message: string) {
  store.dispatch(
    api.endpoints.sendMessage.initiate({
      meetingId: store.getState().auth.roomName,
      meetingName: store.getState().auth.roomName,
      senderName: store.getState().auth.username,
      messageBody: message,
    })
  );
}
