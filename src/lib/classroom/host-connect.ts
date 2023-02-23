import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";
import { v4 } from "uuid";
import { setRoomName } from "../../state/slices/auth";
import { CLASSROOMS_SERVER_URL } from "../constants/urls";

export async function hostCreateMeeting(title: string) {
  const newMeetingId = v4();
  
  const response = await saveOnlineMeetingToDB(newMeetingId);
  const result = await response.json();
  
  if (result.meetingUrlId) {
    store.dispatch(setRoomName(newMeetingId));
    return result.meetingUrlId;
  }
}

export async function hostStartMeeting(title: string, meetingId:string) {
  store.dispatch(
    api.endpoints.startMeeting.initiate({ title, meetingId })
  );
}

// TODO: get real data
async function saveOnlineMeetingToDB(meetingId: string) {
  return await fetch(CLASSROOMS_SERVER_URL, {
    method: "post",
    body: JSON.stringify({
      onlineClass: {
        duration: 1,
        fee: 1000,
        meetingUrlId: meetingId,
        className: "test class",
        time: "12/11/2023",
        date: "12/11/2023",
      },
    }),
    headers: {
      Authorization: "Bearer " + store.getState().auth.authJwtToken,
      'Content-type' :'application/json'
    },
  });
}
