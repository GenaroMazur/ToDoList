import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import {Routes, Route} from "react-router-dom"
function App() {
  return (
    <div>

      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
