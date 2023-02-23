import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";
import { v4 } from "uuid";
import { setRoomName } from "../../state/slices/auth";
import { CLASSROOMS_SERVER_URL } from "../constants/urls";

export async function hostStartMeeting(title: string, meetingId: string) {
  const newMeetingId = v4();
  store.dispatch(
    api.endpoints.startMeeting.initiate({ title, meetingId: newMeetingId })
  );
  store.dispatch(setRoomName(newMeetingId));
  const x = await saveOnlineMeetingToDB(newMeetingId);
  return newMeetingId;
}

// TODO: get real data
async function saveOnlineMeetingToDB(meetingId: string) {
  return await fetch(CLASSROOMS_SERVER_URL, {
    method: 'post',
    body: JSON.stringify({
      duration: "1",
      fee: 1000,
      meetingUrlId: meetingId,
      className: "test class",
      time: "12/11/2023",
      date: "12/11/2023",
    }),
  });
}
