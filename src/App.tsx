import "./styles/app.scss";
import CreateMeetingView from "./views/create-meeting-view";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomView from "./views/room/RoomView";
import LoginView from "./views/login/LoginView";
function App() {
  const isHost = useSelector((state: RootState) => state.room.isHost);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isHost && <CreateMeetingView />}
                {!isHost && <LoginView />}
              </>
            }
          ></Route>
          <Route path="/classrooms/:roomId" element={<RoomView/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
