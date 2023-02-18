import React, { useState } from "react";

const TeacherDashboardView = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="teacher-dashboard-view">
      <div className="center-panel">
        <div>
          <h3>Enter meeting title</h3>
        </div>
        <div className="center-panel-meeting-form">
          <form>
            <input type="text" value={title} />

            <input type="submit" value="START" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardView;
