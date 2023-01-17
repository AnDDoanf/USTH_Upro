import React from 'react';
import project_icon from '../../assets/img/project-icon.svg'
import worklist from '../../assets/img/work-list.svg'
import board from '../../assets/img/board.svg'
import setting from '../../assets/img/setting.svg'
import add_issues from '../../assets/img/add-issues.svg'
import edit_issues from '../../assets/img/edit-issues.svg'
import useNavbar from '../../talons/navbar';


const YourProject = props => {
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

        <div className="board-workspace">
            <div className="board-header">
                <div className="sprint-name-display">Sprint 1</div>
                <div className="sprint-start-date-display">Nov 1</div>-
                <div className="sprint-end-date-display">Nov 25</div>
            </div>
            <div className="board-body">
                <div id="tiqd-card">
                    <div className="todo-card">To do
                        <div className="todo-number">
                            <div id="todo-number display">1</div>
                        </div>
                    </div>
                    <div className="inprogress-card">In progress
                        <div className="inprogress-number">
                            <div id="inprogress-number display">10</div>
                        </div>
                    </div>
                    <div className="qa-card">QA
                        <div className="qa-number">
                            <div id="qa-number display">10</div>
                        </div>
                    </div>
                    <div className="done-card">Done
                        <div className="done-number">
                            <div id="done-number display">10</div>
                        </div>
                    </div>
                   
                </div> 
                <div id="tiqd-body">
                    <div className="todo-column">
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                    </div>
                    <div className="inprogress-column">
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                    </div>
                    <div className="qa-column">
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                    </div>
                    <div className="done-column">
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                        <div className="task-card-template">Create UI</div>
                    </div>
                </div>
            </div>
        </div>

        
      </div>
</div>
    )
}

export default YourProject;