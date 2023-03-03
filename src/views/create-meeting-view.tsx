import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  hostCreateMeeting,
} from "../lib/classroom/host-connect";
import { CLASSROOMS_CLIENT_URL } from "../lib/constants/urls";
import { RootState, store } from "../state/store";

const CreateMeetingView = () => {
  const isHost = useSelector((state: RootState) => state.room.isHost);
  const [title, setTitle] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const [meetingActive, setMeetingActive] = useState("");

  async function handleStartMeeting(e: FormEvent) {
    e.preventDefault();

    const id = await hostCreateMeeting(title);

    setMeetingId(id);
  }

  function startMeeting() {
    // hostStartMeeting(title, meetingId);
    setMeetingActive(meetingId);
  }

  if (meetingActive !== "")
    return <Navigate to={CLASSROOMS_CLIENT_URL +"/" +meetingActive} />;

  return (
    <div className="create-new-meeting-view">
      <div className="center-panel">
        <div className="center-panel-heading">
          <h3>Schedule a new online class</h3>
        </div>
        <div>
          <form onSubmit={handleStartMeeting}>
            <input
              type="text"
              name="classTitle"
              className="class-title"
              placeholder="Classroom title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input type="submit" value="Create" />
          </form>
          {meetingId?.trim() !== "" && (
            <>
              <div>
                <textarea
                  name="created-class-link"
                  cols={30}
                  rows={10}
                  value={meetingId}
                ></textarea>
              </div>

              <br />

              <button
                className="start-meet-button"
                onClick={() => startMeeting()}
              >
                Start
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingView;
