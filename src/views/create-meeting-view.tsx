import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";


const CreateMeetingView = () => {
  const isLinkCreated = useState(false);
  const isHost = useSelector((state: RootState) => state.room.isHost)

  return (
    <div className="create-new-meeting-view">
      <h2>Schedule a new online class</h2>
      <form>
        <input type="text" name="classTitle" className="class-title" />
        <input type="submit" value="Create" />
      </form>

  { isLinkCreated &&  isHost &&  <div>
        <textarea
          name="created-class-link"
          cols={30}
          rows={10}
        ></textarea>
      </div>}
    </div>
  );
};

export default CreateMeetingView;
