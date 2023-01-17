import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./login/index.js"
import Homepage from './homepage/Homepage.js';
import { useState } from 'react';

function App() {
  const [userCode, setUserCode] = useState("");
  const getData = (data) => {
    setUserCode(data);
  };

  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center"/>
      <Routes>
        <Route exact path="/" element={<Login onSubmit = {getData} />}/>
        <Route path="/homepage/*" element={<Homepage userCode = {userCode}/>}/>

      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
