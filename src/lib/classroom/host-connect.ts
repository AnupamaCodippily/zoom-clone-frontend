import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";
import { v4 } from "uuid";
import { setRoomName } from "../../state/slices/auth";

export function hostStartMeeting (title: String) {
    const newMeetingId = v4()
    store.dispatch(api.endpoints.sendMessage.initiate({ title, meetingId: newMeetingId }));
    store.dispatch(setRoomName(newMeetingId))
    return newMeetingId;
}