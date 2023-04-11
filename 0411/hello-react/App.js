import logo from './logo.svg';
import './App.css';
import Mycomponent1 from './component/mycomponent1';
import Inputtest from './component/Inputtest';


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Mycomponent1/>
      {/*<Appclass address = "서울시 성동구" title = "아이엠그라운드"/>*/}
      {/* <Appclass2 address = "대전시 서구" title = "아이엠그라운드"/> */}
      <Inputtest/>
    </div>
  );
}

export default App;
