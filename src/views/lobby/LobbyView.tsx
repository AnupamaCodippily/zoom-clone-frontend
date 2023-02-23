import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkClassroom } from "../../lib/classroom/student-connect";
import { CLASSROOMS_CLIENT_URL } from "../../lib/constants/urls";
import { setMeetingTitle, setRoomName } from "../../state/slices/auth";

const LobbyView = () => {
  const [code, setCode] = useState("");
  const [classroomActive, setClassroomActive] = useState("");
  const dispatch= useDispatch();

  async function checkClassroomCode(e: FormEvent) {
    e.preventDefault();

    if (code.trim() !== "") {
      const res = await checkClassroom(code);

      if (res) {
        dispatch(setMeetingTitle(res.className))
        dispatch(setRoomName(res.meetingUrlId))
        setClassroomActive(res.meetingUrlId);
      }
    }
  }
  if (classroomActive && classroomActive !== '')
    return <Navigate to={CLASSROOMS_CLIENT_URL + "/" + classroomActive} />;
  return (
    <div className="lobby-view">
      <div className="lobby-view-center-panel">
        <div>
          <h3>Enter classroom code</h3>
        </div>
        <div>
          <form onSubmit={(e) => checkClassroomCode(e)}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <br />
            <br />
            <br />
            <input type="submit" value="JOIN" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LobbyView;
