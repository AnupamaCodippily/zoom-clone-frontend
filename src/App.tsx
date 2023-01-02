import './styles/app.scss';
import Header from './components/header/Header';
import RoomView from './views/room/RoomView';

function App() {
  return (
    <div className="App">
      <Header/>
      <RoomView>
        <div>hi</div>
      </RoomView>
    </div>
  );
}

export default App;
