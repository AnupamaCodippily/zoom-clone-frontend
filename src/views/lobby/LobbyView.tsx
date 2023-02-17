import React, { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkClassroom } from "../../lib/classroom/student-connect";
import { CLASSROOMS_CLIENT_URL } from "../../lib/constants/urls";

const LobbyView = () => {
  const [code, setCode] = useState("");

  async function checkClassroomCode(e: FormEvent) {
    e.preventDefault();

    if (code.trim() !== "") {
      const res=  await checkClassroom(code);

      if (res) {
        return <Navigate to={CLASSROOMS_CLIENT_URL + "/" + code}/>
      }
    }
  }

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
