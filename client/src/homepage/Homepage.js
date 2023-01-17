import React from 'react'
import Header from './components/header/Header';
import Main from './components/main/Main';
import "./assets/css/style.css"

const Homepage = (props) => {
  return (
    <div>
        {/* <h1>{props.userCode}</h1> */}
        <Header userCode = {props.userCode}/>
        <Main userCode = {props.userCode}/>
    </div>
  )
}

export default Homepage;