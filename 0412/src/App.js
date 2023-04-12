import logo from './logo.svg';
import './App.css';
// import HelloComponent from './component/HelloComponent';
// import Iftest1 from './component/Iftest1';
// import Fortest1 from './component/Fortest1'
// import Fortest2 from './component/Fortest2'
// import Hero from './component/Hero'
// import Ss from './component/Ss'
import HeroList from './component/HeroList'
import HeroWrite from './component/HeroWrite';

function App() {
  return (
    <div className="App">
      <h1 className = "title"> 뉴진스의 하입뽀이요 </h1>
      {/* <HelloComponent/> */}
      {/* <Iftest1/>
      <Fortest1/>
      <Fortest2/> */}
      {/* <Hero/>
      <Ss/> */}
      <HeroList/>
      <HeroWrite/>
    </div>
  );
}

export default App;