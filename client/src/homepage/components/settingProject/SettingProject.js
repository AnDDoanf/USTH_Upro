import React from 'react';
import project_icon from '../../assets/img/project-icon.svg'
import worklist from '../../assets/img/work-list.svg'
import board from '../../assets/img/board.svg'
import setting from '../../assets/img/setting.svg'
import add_issues from '../../assets/img/add-issues.svg'
import edit_issues from '../../assets/img/edit-issues.svg'
import useNavbar from '../../talons/navbar';



const SettingProject = props => {
    const talonProps = useNavbar();
    const { handleNavbarToWorklist,
            handleNavbarToYourProject,
            handleNavbarToSettingProject,
            } = talonProps;

    function hide_dropdown(){
    
        document.getElementById("notification-dropdown-container").style.display = "none";
        document.getElementById("user-dropdown-container").style.display = "none";
        document.getElementById("search-dropdown-container").style.display = "none";
      
      }
    
      function show_add_people(){
        document.getElementById("overlay2").style.display = "block";
      }
    
      function close_search_people(){
        document.getElementById("overlay2").style.display = "none";
      }
    
      function show_search_people_dropdown(){
        var search_people_dropdown = document.getElementById("search-people-dropdown");
        if(search_people_dropdown.style.display == "none"){
          search_people_dropdown.style.display = "block";
        }
        else{
          search_people_dropdown.style.display = "none";
        }
      }


    return (
<div className="container">
      <div id='overlay2' className="overlay2">
      <div className="add-people-window">
        <div className="add-people-container">

          <div className="add-people-header">
            <div className="add-people-title">Add people</div>
          </div>

          <div className="add-people-body">
            <div className="search-people-container">
              <input onClick={show_search_people_dropdown} type="text" placeholder="Search for name, email."/>
              <div id="search-people-dropdown">
                <a>Placeholder</a>
              </div>
            </div>
          </div>

          <div className="add-people-footer">
            <button onClick={close_search_people}>Cancel</button>
            <button>Add</button>
          </div>

        </div>
      </div>
      </div>

      <div className="workspace2" onClick={hide_dropdown}>

        <div className="left-workspace">
          <div className="left-workspace-project-icon">
            <img src={project_icon}/>
          </div>
          <div className="left-workspace-project-name">
            Group Project 2022 - 2023
          </div>
          <div className="left-workspace-project-three-button">
            <div onClick={handleNavbarToWorklist} className="work-list-btn">
              <img src={worklist}/>
              <a>Work list</a>
            </div>
            <div onClick={handleNavbarToYourProject} className="board-btn">
              <img src={board}/>
              <a>Board</a>
            </div>
            <div onClick={handleNavbarToSettingProject} className="setting-btn">
              <img className="settingimage" src={setting}/>
              <a>Setting</a>
            </div>
            
          </div>
          <div className="left-workspace-project-member">
            <div className="project-member-number">
              <p>Member</p>
              <p>6</p>
            </div>
            <div className="project-member-list">
              <div className="member-card-temp">
                Dinh Tuan Cuong
              </div>
              <div className="member-card-temp">
                Dinh Quang Son
              </div>
              <div className="member-card-temp">
                Nguyen Hoai Phuong
              </div>
            </div>
          </div>
          <div className="add-member-container">
            <button className="add-member-btn" onClick={show_add_people}>Add people</button>
          </div>
        </div>

        <div className="project-setting">

          <div className="project-name-container">
            <p className="project-name">Project Name</p>
            <div className="project-name-input">
              <textarea  readOnly name="" id="" cols="50" rows="1">Group Project 2022 - 2023</textarea>
            </div>
          </div>

          <div className="project-key-container">
            <p className="project-key">Key</p>
            <div className="project-key-input">
              <textarea readOnly name="" id="" cols="30" rows="1">MV7XK</textarea>
            </div>
          </div>

          <div className="project-lead-container">
            <p className="project-lead">Project Lead</p>
            <div className="project-lead-select">
              <select name="" id="">
                <option value="">Dinh Tuan Cuong</option>
                <option value="">Dinh Tuan Cuong</option>
                <option value="">Dinh Tuan Cuong</option>
                <option value="">Dinh Tuan Cuong</option>
                <option value="">Dinh Tuan Cuong</option>
                <option value="">Dinh Tuan Cuong</option>
              </select>
            </div>
          </div>

          <div className="project-major-container">
            <p className="project-major">Major</p>
            <div className="project-major-select">
              <select name="" id="">
                <option value="">Information and Communication Technology</option>
                <option value="">Computer Science</option>
              </select>
            </div>
          </div>

          <div className="project-year-container">
            <p className="project-year">Year</p>
            <div className="project-year-input">
              <input type="date" />-
              <input type="date" />
            </div>
            
          </div>

          <div className="project-description-container">
            <p className="project-description">Description</p>
            <div className="project-description-input">
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>

          <div className="project-setting-button">
            <button className="reset-project-information">Reset</button>
            <button className="save-project-information">Save</button>
          </div>

        </div>
      </div>
</div>
    )
}

export default SettingProject;