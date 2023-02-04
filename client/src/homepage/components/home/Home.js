import React from 'react';
import useNavbar from '../../talons/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Home = (props) => {
  const talonProps = useNavbar();
  const {handleNavbarToWorklist} = talonProps;

  const [userName, setUserName] = useState("");

  // 4 states below must have the same length == number of projects
  const [projectNameList, setProjectNameList] = useState([]);
  const [projectCodeList, setProjectCodeList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get_user/user_code/${props.userCode}`)
    .then((res) => {
      res.data.map((item, i) => (
          setUserName(item.user_name)
      ))
    })
    .catch(err => console.log(err));
  }, [props.userCode])

  useEffect(() => {
    axios.get(`http://localhost:3001/get_project/user_code/${props.userCode}`)
    .then((res) => {
      res.data.map((item, i) => (
          setProjectNameList(current => [...current, item.project_name]),
          setProjectNameList(current => [...new Set(current)]),
          setProjectCodeList(current => [...current, item.project_code]),
          setProjectCodeList(current => [...new Set(current)])
      ))
    }, [])
    .catch(err => console.log(err));
  }, [props.userCode])

  const handleAccess = (a) => {
    props.getData(a);
  }

  function hide_dropdown(){
    document.getElementById("notification-dropdown-container").style.display = "none";
    document.getElementById("user-dropdown-container").style.display = "none";
    document.getElementById("search-dropdown-menu").style.display = "none";
  }

  function show_modal(){
    document.getElementById("overlay").style.display ="block";
  }
  function close_modal(){
    document.getElementById("overlay").style.display = "none";
  }

return(
<div className="container1">
  <div className="workspace1" onClick={hide_dropdown}>
    <b>Hello {userName} </b>
    <p>Recent project</p>
  
    <div className="project-card-container">

{/* cards */}
      {projectNameList.map((item, index) => (
        <div onClick={() => {handleAccess(projectCodeList[index]); handleNavbarToWorklist();}} className="project-card">
          <div className="project-card-header">
            <div className="project-card-color-tag"></div>
            <p>{item}</p>
          </div>
          <div className="project-card-body-01">
            <p>My issues</p>
            <div className="project-card-my-issues-number">
              19
            </div>
          </div>
          <div className="project-card-body-02">
            <p>Done issues</p>
            <div className="project-card-done-issues-number">
              100
            </div>
          </div>
          
          <div className="project-card-footer">
            <button>Setting</button>
          </div>
        </div>
      ))}
{/* cards */}
             
        </div>
      </div>
        <div className="footer">
            <button onClick={show_modal} >Create New Project</button>
        </div>
        <div id ="overlay" className="overlay">
      <div className="new-project-container">
        
                <div className="new-project-header">
                  <div className="new-project-title">
                    Create Your Project
                  </div>
                </div>
                
                <div className="new-project-body">
                  <h1>Project details</h1>
                  <p>You can change these details anytime in your project settings.</p>
                  <div className="newproject-body-mid">

                    <div className="newproject-body-mid-left">
                      <p>Project Name</p>
                      <input type="text" placeholder='Project Name' />
                      <p>Key</p>
                      <div className="key-field">
                        <input type="text" placeholder='Key'/>
                        <button>Generate</button>
                      </div>
                      <p>Project Lead</p>
                      <select name="" id="">
                        <option>Dinh Tuan Cuong</option>
                        <option>Dinh Quang Son</option>
                        <option>Nguyen The Thang</option>
                        <option>Nguyen Hoai Phuong</option>
                      </select>
                    </div>

                    <div className="newproject-body-mid-right">
                      <p>Major</p>
                      <select name="" id="">
                        <option>Information and Communication Technology</option>
                        <option>Computer Science</option>
                      </select>
                      <p>Year</p>
                      <div className="year-field">
                        <input type="number" min="2010" max="2099" step="1" placeholder="From" />
                        -
                        <input type="number" min="2010" max="2099" step="1" placeholder="To"/>
                      </div>
                      
                    </div>

                  </div> 
                  <b>Description</b>
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="new-project-footer">
                  <button onClick={close_modal} >Cancel</button>
                  <button>Create</button>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Home;