import React, { useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Project, Homepage, LandingPage } from './App';
import Login from './login/index';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
    const [userCode, setUserCode] = useState("");
    const getData = (data) => {
      setUserCode(data);
    };

    const [projectCode, setProjectCode] = useState("");
    const getCode = (data) => {
      setProjectCode(data);
    };
  
    return (
      <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route exact path='/' element={<LandingPage/>}/> */}
          <Route exact path="/" element={<Login onSubmit = {getData} />}/>
          <Route path="/homepage/*" element={<Homepage userCode = {userCode} onSubmit = {getCode}/>}/>
          <Route path="/project/*" element={<Project projectCode = {projectCode} userCode = {userCode}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    );
}

root.render(
    <Main/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
