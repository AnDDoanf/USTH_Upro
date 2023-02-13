import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import worklist from './icon/worklist.svg';
import board from './icon/board.svg';
import setting from './icon/setting.svg';
import notification from './icon/notification.svg';
import user from './icon/user.svg';
import showmore from './icon/more.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


// function LandingPage() {
//   const page =require('./UPRO/index.html');
//   const history = useNavigate();
//   const handleToLogin = useCallback(()=>{
//       history('/login')
//   });
//   return (
//     <iframe src={page}></iframe>
//   );
// }

// Header and Homepage
function Homepage(props) {

  const history = useNavigate();
  const handleHomepageToProject = useCallback(()=>{
      history('/project')
  });

  const [userName, setUserName] = useState(""); 
  useEffect(() => {
    axios.get(`http://localhost:3001/get_user/user_code/${props.userCode}`)
    .then((res) => {
      res.data.map((item, i) => (
          setUserName(item.user_name)
      ))
    })
    .catch(err => console.log(err));
  }, [props.userCode])

  const [projectList1, setProjectList1] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_project/user_code/${props.userCode}`)
    .then((res) => {
      setProjectList1(res.data);
    })
    .catch(err => console.log(err));
  })

  const [projectList2, setProjectList2] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_project1/user_code/${props.userCode}`)
    .then((res) => {
      setProjectList2(res.data);
    })
    .catch(err => console.log(err));
  })

  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    setProjectList([...projectList1, ...projectList2]);
  })

  const handleAccess = (a) => {
    props.onSubmit(a);

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

  const [page, setPage] = useState(1);
  
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      setNotificationDropdownOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, [dropdownRef, notificationDropdownRef]);

  const [newProjectType, setNewProjectType] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const newProjectCreatedDate = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();;
  const newProjectLeader = props.userCode;
  function handleCreateProject() {
    console.log(newProjectType)
    if (!newProjectType || !newProjectCreatedDate || !newProjectType) {
        console.log("Not enough infomations");
    } else {
      // POST request to create new data
      axios.post("http://localhost:3001/add_project" , {
        newProjectName,
        newProjectType,
        newProjectDescription,
        newProjectCreatedDate,
        newProjectLeader
      })
      .catch((err) => console.log(err));
    }
    document.getElementById("overlay").style.display = "none";
  }
  function handleUpdateNew() {
    axios.get(`http://localhost:3001/project`)
    .then((res) => {
      const projectAdd = res.data.project_code;
      console.log(projectAdd);
    })
    .catch(err => console.log(err));
  }
return(
<div>
  <div className="navbar">
    <div className="logo">Upro</div>
      <div className="search-bar"><input type="search" placeholder='Searching project...' /></div>
      <div className="notification" onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}>
        <img src = {notification} alt="" />
        {notificationDropdownOpen && (
          <div className="notification-dropdown-menu" ref={notificationDropdownRef}>
            <div className="dropdown-item">Notification 1</div>
            <div className="dropdown-item">Notification 2</div>
            <div className="dropdown-item">Notification 3</div>
            <div className="dropdown-item">Clear All</div>
          </div>
        )}
        <div className="tooltip_noti">notification</div>
    </div>
    <div className="user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src = {user} alt=""/>
          {dropdownOpen && (
          <div className="user-dropdown-menu" ref={dropdownRef}>

            <div className="dropdown-item" onClick={() => handlePageChange(4)}>Your Profile</div>
            
            <div className="dropdown-item">Log Out</div>

          </div>
          )}
          <div className="tooltip_user">profile</div>
        </div>
  </div>
  <div className="container1">
    <div className="workspace1" onClick={hide_dropdown}>
      <b>Hello {userName} </b>
      <p>Recent project</p>
    
      <div className="project-card-container">

  {/* cards */}
        {projectList.map((item, index) => (
          <div className="project-card" onClick={() =>{handleAccess(item.project_code); handleHomepageToProject()}}>
            <div className="project-card-header">
              <div className="project-card-color-tag"></div>
              <p>{item.project_name}</p>
            </div>
            <div className="project-card-body-01">
              {/* <p>My issues</p> */}
              <div className="project-card-my-issues-number">
                {/* 19 */}
              </div>
            </div>
            <div className="project-card-body-02">
              {/* <p>Done issues</p> */}
              <div className="project-card-done-issues-number">
                {/* 100 */}
              </div>
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
              <input type="text" defaultValue={""} value = {newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder='Project Name' />
              {/* <p>Member</p>
              <input type="text" defaultValue={""} value = {newProject.project_name} onChange={e => setNewProject({...newProject, project_name: e.target.value})} placeholder='Search for members' /> */}
            </div>
            <div className="newproject-body-mid-right">
              <p>Major</p>
              <select defaultValue= "ICT" value = {newProjectType} onChange={e => setNewProjectType(e.target.value)}>
                <option value="ICT">Information and Communication Technology</option>
                <option value="CS">Computer Science</option>
              </select>
            </div>
          </div> 
          <b>Description</b>
          <textarea name="" id="" cols="30" rows="10" value = {newProjectDescription} onChange={e => setNewProjectDescription(e.target.value)}></textarea>
        </div>
        <div className="new-project-footer">
          <button onClick={close_modal} >Cancel</button>  
          <button onClick={() => {handleCreateProject(); handleUpdateNew()}}>Create</button>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

// Header and left menu
function Project(props) {
  
    // Get project's name
    const [projectName, setProjectName] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:3001/get_project/project_code/${props.projectCode}`)
      .then((res) => {
        res.data.map((item, i) => (
          setProjectName(current => [...current, item.project_name]),
          setProjectName(current => [...new Set(current)])
        ))
      })
      .catch(err => console.log(err));
    }, [props.projectCode])

  const [page, setPage] = useState(1);
  
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      setNotificationDropdownOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, [dropdownRef, notificationDropdownRef]);

  // redirect to homepage
  const history = useNavigate();
  const handleNavbarToHomePage = useCallback(()=>{
      history('/homepage')
  });

  // Get project's members
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_member/project_code/${props.projectCode}`)
    .then((res) => {
      res.data.map((item, i) => (
        setMemberList(current => [...current, item.user_name]),
        setMemberList(current => [...new Set(current)])
      ))
    })
    .catch(err => console.log(err));
  }, [props.projectCode])


  //Search user
  const [searchMail, setSearchMail] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3001/get_user/user_mail/${searchMail}`)
    .then((res) => {
      setSearch(res.data)
    })
    .catch(err => console.log(err));
  }, [searchMail])

  function handleAddMember() {
    if (search.length === 0) {
      console.log("No email match");
    } else {
      if (memberList.indexOf(search[0].user_name) === -1) {
        const memberAdd = search[0].user_code;
        const projectAdd = props.projectCode;
        axios.post("http://localhost:3001/add_member" , {
                    memberAdd,
                    projectAdd
                })
                .then(() => {
                    setSearch("");
                })
                .catch((err) => console.log(err));
        console.log("Add successfully");
      } else {
        console.log("user already in this project");
      }
    }
  } 

  return (

    <div className="app"> 
      <div className="navbar">
        <div className="logo" onClick={handleNavbarToHomePage}>Upro</div>
        <div className="search-bar"><input type="search" placeholder='Searching project...' /></div>

        <div className="notification" onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}>
          <img src = {notification} alt="" />
          {notificationDropdownOpen && (
            <div className="notification-dropdown-menu" ref={notificationDropdownRef}>
              <div className="dropdown-item">Notification 1</div>
              <div className="dropdown-item">Notification 2</div>
              <div className="dropdown-item">Notification 3</div>
              <div className="dropdown-item">Clear All</div>
            </div>
          )}
          <div className="tooltip_noti">notification</div>
        </div>
        
       
        <div className="user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src = {user} alt=""/>
          {dropdownOpen && (
          <div className="user-dropdown-menu" ref={dropdownRef}>

            <div className="dropdown-item" onClick={() => handlePageChange(4)}>Your Profile</div>
            
            <div className="dropdown-item">Log Out</div>

          </div>
          )}
          <div className="tooltip_user">profile</div>
        </div>
      </div>

      <div className="left-menu">
        <div className="project-icon-display">
          <div className="project-icon">
            </div>
            </div>
        <div className="project-name-display"> <p>{projectName}</p></div>
        <div className="project-button-container">
          <div className="worklist-button" onClick={() => handlePageChange(1)}>
            <img src={worklist} alt="" />
            <button>Work list</button>
          </div>
          <div className="board-button" onClick={() => handlePageChange(2)}>
            <img src={board} alt="" />
            <button>Board</button>
          </div>
          <div className="setting-button" onClick={() => handlePageChange(3)}>
            <img src={setting} alt="" />
            <button>Setting</button>
          </div>
          <div className="setting-btn">
            <input onChange={(event) => {
                setSearchMail(event.target.value);
                }} 
                style = {{border: "none", padding: "20px"}}
                value={searchMail} 
                type="text" 
                placeholder="Add people."/>
                  <div className="add-people-footer">
                    <button>Cancel</button>
                    <button onClick={handleAddMember}>Add</button>
                  </div>
          </div>

        </div>
      </div>

      <div className="right-menu">
          {page === 1 ? <Page1Content projectCode = {props.projectCode} userCode = {props.userCode}/> : (page === 2 ? <Page2Content projectCode = {props.projectCode}/> : (page === 3 ? <Page3Content projectCode = {props.projectCode}/> : <Page4Content projectCode = {props.userCode}/>))}
        
      </div>
    </div>

  );
 
}

// Worklist/ Sprint
function Page1Content(props) {
  // get all sprint in project
  const [sprintList, setSprintList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_sprint/project_code/${props.projectCode}`)
    .then((res) => {
      setSprintList(res.data)
    })
    .catch(err => console.log(err));
  })

  // get all tasks in project
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_task/project_code/${props.projectCode}`)
    .then((res) => {
      setTaskList(res.data);
    })
    .catch(err => console.log(err));
  })

  // get all tasks in project
  const [sprintCount, setSprintCount] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/sprint_count`)
    .then((res) => {
      setSprintCount(res.data.numberSprint);
    })
    .catch(err => console.log(err));
  }, [])

  function handleAddSprint() {
    const nextSprint = (sprintCount+1);
    const project = props.projectCode;
    const count = sprints.length;
    const startDate = sprints[count-1].startDate;
    const dueDate = sprints[count-1].endDate;

    axios.post("http://localhost:3001/add_sprint" , {
                  project,
                  nextSprint,
                  startDate,
                  dueDate
              })
              .catch((err) => console.log(err));
    console.log("Add successfully");
  } 

  const [sprints, setSprints] = useState([]);
  const [sprintInfo, setSprintInfo] = useState({startDate: "", endDate: ""});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sprintInfo.startDate === "" || sprintInfo.endDate === "") {
        
        return;
    }
    setSprints([...sprints, { ...sprintInfo, id: uuidv4() }]);
    handleAddSprint();
    setSprintInfo({startDate: "", endDate: ""});
    setShowOverlay(false);
  }

  const [showOverlay, setShowOverlay] = useState(false);

  const [showDeleteOverlay, setShowDeleteOverlay] = useState({show: false, id: ""});

  const handleDeleteSprint = (sprint_code) => {  
    setShowDeleteOverlay({show: true, id: sprint_code});
  }
  const handleDeleteConfirm = () => {
    // DELETE request to remove data in db
    axios.delete(`http://localhost:3001/delete_sprint/${showDeleteOverlay.id}`);
    console.log("Delete successfully");
    setShowDeleteOverlay({show: false});
  }

  const [showIssueOverlay, setShowIssueOverlay] = useState(false);
  const [issueName, setIssueName] = useState("");
  const [issueStartDate, setIssueStartDate] = useState("");
  const [issueDueDate, setIssueDueDate] = useState("");
  const [issueAssignee, setIssueAssignee] = useState("");
  const [issuePriority, setIssuePriority] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const userCode = props.userCode;
  const newIssueState = "waiting"
  const [curSprint, setCurSprint] = useState("");

  const handleCreateIssue = () => {
    setShowIssueOverlay(true);
  }

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    if (!issueName || !issueAssignee || !issueDueDate || !issueStartDate) {
        console.log("Not enough infomations");
    } else {
            // POST request to create new data
            axios.post("http://localhost:3001/add_task" , {
              issueName,
              issueStartDate,
              issueDueDate,
              issueDescription,
              issuePriority,
              userCode,
              curSprint,
              newIssueState
            })
            .catch((err) => console.log(err));
      setShowIssueOverlay(false);
    }
    setIssueName(null);
    setIssueStartDate(null);
    setIssueDueDate(null);
    setIssueDescription(null);
    setIssuePriority(null);
    setIssueAssignee(null);
  }
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
  }

  function handleUpdateTask(task) {
    const task_code = task.task_code;
    const task_description = task.task_description;
    const task_name = task.task_name;
    axios.put(`http://localhost:3001/update_task` , {
      task_code,
      task_description,
      task_name
    })
    .catch((err) => console.log(err));
    setSelectedIssue(null);
  }

function handleDeleteIssue(id) {
  axios.delete(`http://localhost:3001/delete_task/${id}`);
  setSelectedIssue(null);
}


  return (
    
    <div className="worklist-container">

      {/* Delete Sprint Overlay */}
      {showDeleteOverlay.show && (
        <div className="delete-sprint-overlay">
          <div className="delete-sprint-overlay-window">
            <div className="delete-sprint-overlay-header">
              <p>Are you sure you want to delete this sprint?</p>
            </div>
            <div className="delete-sprint-overlay-footer">
              <button onClick={handleDeleteConfirm}>Delete</button>
              <button onClick={() => setShowDeleteOverlay({show: false, id: ""})}>Cancel</button>
            </div>
          </div>
        </div>
        )}

      {/* Create Sprint Overlay */}
      {showOverlay && (
          <div className="worklist-overlay">
            <div className="worklist-overlay-window">

              <div className="worklist-overlay-header">
                Create sprint
              </div>

              <div className="worklist-overlay-body">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="">Start Date?</label>
                  <input type="date" value={sprintInfo.startDate} onChange={e => setSprintInfo({...sprintInfo, startDate: e.target.value})} placeholder="Start date"  min={new Date().toISOString().split("T")[0]}/>
                  <label htmlFor="">End Date?</label> 
                  <input type="date" value={sprintInfo.endDate} onChange={e => setSprintInfo({...sprintInfo, endDate: e.target.value})} placeholder="End date" min={sprintInfo.startDate} max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]}/>      
                  <div className="worklist-overlay-footer">
                    <button className='worklist-overlay-button1' onClick={() => { setSprintInfo({name: "", startDate: "", endDate: ""}); setShowOverlay(false);}}>Cancel</button>
                    <button type='submit' className='worklist-overlay-button2'>Create</button>  
                  </div>
                </form>
              </div>
             
            
            </div>

          </div>
        )}

      {/* List Sprint */}
      <div className="worklist-left">
        <h2>Work List</h2>

        <button className='create-sprint-button' onClick={() => setShowOverlay(true)}>Create Sprint</button>
        {sprintList.map((sprint) => (
          <div key={sprint.id} id={sprint.id} className='sprint'>
            <div className="sprint-information">  
              <div className='start-date-container'>
                <p className='start-date'>Start date:</p>
                <p className='sprint-date'>{sprint.sprint_start_date.slice(5,7)}/{sprint.sprint_start_date.slice(8,10)}/{sprint.sprint_start_date.slice(0,4)}</p>
              </div>
              <div  className='end-date-container'>
                <p className='end-date'>End date:</p>
                <p className='sprint-date'>{sprint.sprint_due_date.slice(5,7)}/{sprint.sprint_due_date.slice(8,10)}/{sprint.sprint_due_date.slice(0,4)}</p>
              </div>
              <div className="delete-sprint-container">
                <button className='delete-sprint-button' onClick={() => handleDeleteSprint(sprint.sprint_code)}>Delete</button>
              </div>
              
            </div>
            <div className="sprint-card-container">
              <button className='create-issue-button' onClick={() => {handleCreateIssue(); setCurSprint(sprint.sprint_code)}}>Create Task</button>
              {showIssueOverlay && (
                <div className="issue-overlay">
                    <div className="issue-overlay-container">
                      <div className='issue-overlay-window'>
                        <div className="issue-overlay-header">
                          <p>Create Task</p>
                        </div>
                        <div className="issue-overlay-body">
                          <label htmlFor="">Task Name</label>
                          <input type="text" defaultValue = {""} value={issueName} onChange={e => setIssueName(e.target.value)} placeholder="Type in here..." required />
                          <label htmlFor="">Start Date?</label>
                          <input type="date" defaultValue = {""} value={issueStartDate} onChange={e => setIssueStartDate(e.target.value)} placeholder="Start date"  min={new Date().toISOString().split("T")[0]}/>
                          <label htmlFor="">End Date?</label> 
                          <input type="date" defaultValue = {""} value={issueDueDate} onChange={e => setIssueDueDate(e.target.value)} placeholder="End date" min={sprintInfo.startDate} max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]}/> 
                          <label htmlFor="">Assignee</label>
                          <input type="text" defaultValue = {""} value={issueAssignee} onChange={e => setIssueAssignee(e.target.value)} placeholder="Type in here..." required />
                          <label htmlFor="">Priority</label>
                          <select name="" defaultValue={"very high"} value={issuePriority} onChange={e => setIssuePriority(e.target.value)}>
                            <option value="very high">very high</option>
                            <option value="high">high</option>
                            <option value="medium">medium</option>
                            <option value="low">low</option>
                          </select>
                        </div>
                        <div className="issue-overlay-footer">

                          <button onClick={() => setShowIssueOverlay(false)}>Cancel</button>
                          <button onClick={handleSubmitIssue}>Create</button>
                          
                        </div>
                      </div>
                  </div>
                </div>
              )}
              {taskList.filter(task => task.sprint_code === sprint.sprint_code).map((issue, index) => (
                <div className='issue-card' onClick={() => handleSelectIssue(issue)}>
                  <div className="issue-card-color"></div>
                  <div className="issue-card-title"><p>{issue.task_name}</p></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Check task info */}
      <div className="worklist-right">
      {selectedIssue ? (
        <div>
          <form onSubmit={() => {handleUpdateTask(selectedIssue)}}>
            <label htmlFor="">Task name:</label>
            <input type="text" value={selectedIssue.task_name} onChange={e => setSelectedIssue({...selectedIssue, task_name: e.target.value})} placeholder="Issue name" required />
            <label htmlFor="">Task description:</label>
            <textarea cols="15" rows="10"  value={selectedIssue.task_description} onChange={e => setSelectedIssue({...selectedIssue, task_description: e.target.value})} placeholder="Issue description" required />
            <div className="issue-information-button-container">
              <button className='delete-issue-information-button' onClick={() => handleDeleteIssue(selectedIssue.task_code)}>Delete</button>
              <button className='save-issue-information-button' type='Submit'>Save</button>
            </div>
           
          </form>
        </div>
      ) : (
        <p>No issue selected.</p>
      )}
      </div>

    </div>

  );
}

//  Board
function Page2Content(props) {


  const [columns, setColumns] = useState([
    { id: '1', name:'📝 To Do', cards: [] },
    { id: '2', name: '🛠 In Progress', cards: [] },
    { id: '3', name: '🔍 QA', cards: [] },
    { id: '4', name: '☑️ Done', cards: [] }
  ]);

  // get all tasks in project
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/get_task/project_code/${props.projectCode}`)
    .then((res) => {
      setTaskList(res.data);
    })
    .catch(err => console.log(err));

    taskList.map((task) => {
      task.id = uuidv4();
    });

    const todoTask = Object.values(taskList.filter(task => task.state == "to do"));
    const inProgressTask = Object.values(taskList.filter(task => task.state == "in progress"));
    const QATask = Object.values(taskList.filter(task => task.state == "QA"));
    const doneTask = Object.values(taskList.filter(task => task.state == "done"));
    columns[0].cards = todoTask;
    columns[1].cards = inProgressTask;
    columns[2].cards = QATask;
    columns[3].cards = doneTask;
  }); 
  
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDescription, setCardDescription] = useState('');

  const handleAddCard = () => {
    const updatedColumns = columns.map((column, index) => {
      if (index === 0) {
        return {
          ...column,
          cards: [
            ...column.cards,
            {
              id: uuidv4(),
              text: `Task ${column.cards.length + 1}`,
              createdAt: new Date()
            }
          ]
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };
 
 
 
 
  const handleCardClick = card => {
    setSelectedCard(card);
    setCardDescription(card.description);
  };
 
  const handleDescriptionChange = e => {
    setCardDescription(e.target.value);
  };
 
  const handleOverlayClose = () => {
    setSelectedCard(null);
    setCardDescription('');
  };
 
  const handleSaveDescription = () => {
    const updatedColumns = columns.map(column => {
      return {
        ...column,
        cards: column.cards.map(card => {
          if (card.id === selectedCard.id) {
            return { ...card, description: cardDescription };
          }
          return card;
        })
      };
    });
    setColumns(updatedColumns);
    setSelectedCard(null);
    setCardDescription('');
  };
 
  const handleCardNameChange = (cardId, newName) => {
    const updatedColumns = columns.map(column => {
      return {
        ...column,
        cards: column.cards.map(card => {
          if (card.id === cardId) {
            return { ...card, text: newName };
          }
          return card;
        })
      };
    });
    setColumns(updatedColumns);
  };
  const handleCardNameInputClick = e => {
    setSelectedCard(null);
    e.stopPropagation();
  };
  const handleDeleteCard = () => {
    const updatedColumns = columns.map(column => {
      return {
        ...column,
        cards: column.cards.filter(card => card.id !== selectedCard.id)
      };
    });
    setColumns(updatedColumns);
    setSelectedCard(null);
    setCardDescription('');
  };
 
  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // the card was dropped within the same column
      const updatedColumn = {
        ...columns.find(column => column.id === source.droppableId),
        cards: reorderCards(
          columns.find(column => column.id === source.droppableId).cards,
          source.index,
          destination.index
        )
      };
      const updatedColumns = columns.map(column => {
        if (column.id === updatedColumn.id) {
          return updatedColumn;
        }
        return column;
      });
      setColumns(updatedColumns);
    } else {

      // the card was dropped in a different column
      const sourceColumn = columns.find(column => column.id === source.droppableId);
      const destinationColumn = columns.find(
        column => column.id === destination.droppableId
      );
      const updatedSourceColumn = {
        ...sourceColumn,
        cards: sourceColumn.cards.filter(card => card.id !== result.draggableId)
      };
      const updatedDestinationColumn = {
        ...destinationColumn,
        cards: [
          ...destinationColumn.cards,
          sourceColumn.cards.find(card => card.id === result.draggableId)
        ]
      };
      const updatedColumns = columns.map(column => {
        if (column.id === updatedSourceColumn.id) {
          return updatedSourceColumn;
        }
        if (column.id === updatedDestinationColumn.id) {
          return updatedDestinationColumn;
        }
        return column;
      });
      setColumns(updatedColumns);
    }
  };
  const reorderCards = (cards, startIndex, endIndex) => {
    const result = Array.from(cards);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
 
    return result;
  }

  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [showConfirmDeleteColumn, setShowConfirmDeleteColumn] = useState(false);
  const handleDeleteColumnConfirmed = (columnId) => {
    setShowConfirmDeleteColumn(false);
    setColumns(columns.filter(column => column.id !== columnId));
}


  return (
  <div className='page2'>

    {showConfirmDeleteColumn && (
    <div className="DeleteColumn-overlay">
      <div className="DeleteColumn-overlay-content">
        <div className="DeleteColumn-overlay-header">
          <h3>Are you sure you want to delete this column?</h3>
        </div>
        <div className="DeleteColumn-overlay-footer">
          <button onClick={() => handleDeleteColumnConfirmed(selectedColumnId)}>Delete</button>
          <button onClick={() => setShowConfirmDeleteColumn(false)}>Cancel</button>
        </div>
      </div>
    </div>
    )}

    <h2>Board</h2>
   
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="column-wrapper">
      <div className='board-button-container'>
        {/* <button className="add-column-button" onClick={handleAddColumn}>Create New Column</button> */}
        {/* <button className="add-task-button" onClick={handleAddCard}>Create New Task</button> */}
      </div>
      <div className="column-container">
        {columns.map((column, index) => (
           <Droppable droppableId={column.id} key={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="column"
              >
                <div className='column-name-container'>
                  <div style={{marginTop: "7px"}}>{column.name}</div>
                  <div className="card-count-container">
                    <div className="card-count">
                      {column.cards.length}
                    </div>
                    <img src={showmore} onClick={() => { setShowConfirmDeleteColumn(true); setSelectedColumnId(column.id);}}/>

                  </div>
                </div>
                <div className='task-card-container'>
                {column.cards.map((card, index) => (
                  <Draggable draggableId={card.id} index={index} key={card.id}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card" id={`card-${card.id}`} >
                        <textarea cols="1" rows="3" type="text" value={card.task_name} onChange={e => handleCardNameChange(card.id, e.target.value)} onClick={handleCardNameInputClick}/>
                        {/* <button onClick={() => handleCardClick(card)}></button> */}
                      </div>
                    )}
                  </Draggable>
                ))}</div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
          </div>
            {selectedCard && (
              <div className="overlay">
                <div className="overlay-content">
                  <div className="overlay-header">
                    <h3>{selectedCard.text}</h3>
                  </div>
                  <div className="overlay-body">
                    <div className='createdtime-container'>
                      <p>Created on: </p>
                      <p>{selectedCard.createdAt.toLocaleString()}</p>
                    </div>
                   
                    <label htmlFor="description">Description:</label>
                    <textarea  cols="90" rows="10" value={cardDescription} onChange={handleDescriptionChange} />
                    <div className="upload-container">
                      <p>Upload file: </p>
                      <input type="file"/>
                    </div>
                  </div>
                  <div className="overlay-footer">

                    <button onClick={handleDeleteCard}>Delete</button>
                    <button onClick={handleOverlayClose}>Close</button>
                    <button onClick={handleSaveDescription}>Save</button>
                    
                  </div>
                </div>
              </div>
            )}

            </div>
    </DragDropContext> 

  </div>

  );
}

// Setting
function Page3Content() {
  const [imageUrl, setImageUrl] = useState('http://placehold.it/200x200');
  const handleChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  }
  return (
  <div className='project-setting-container'>
    <h2>Setting</h2>
    <label htmlFor="">Change Project Avatar</label>
        <div class="profile-picture-container">
          {imageUrl && <img id="previewAvatar" src={imageUrl} />}
          <input type="file" onChange={handleChange} />
        </div>
    <label htmlFor="">Project Name</label>                     
    <input type="text" placeholder='Project Name'/>
    <label htmlFor="">Major</label>
    <select name="" id="">
      <option value="">Information and Communications Technology</option>
      <option value="">Space and Applications</option>
      <option value="">Water Environment Oceanography</option>
      <option value="">Advanced Mterials Science and Nanotechnology</option>
    </select>
    <label htmlFor="">Created date</label>
    <p>placeholder</p>
    <label htmlFor="">Project Key</label>
    <p>placeholder</p>
    <button className='project-setting-save-button'>Save</button>
  </div>
  );
}

// Profile
function Page4Content() {

    function showPassword() {
        // Get the password input element
        var passwordInput = document.getElementById("password");

        // Check the current type of the input element
        if (passwordInput.type === "password") {
            // If the type is "password", change it to "text" to show the password
            passwordInput.type = "text";
        } else {
            // If the type is not "password", change it back to "password" to hide the password
            passwordInput.type = "password";
        }
    }
        const [imageUrl, setImageUrl] = useState('http://placehold.it/200x200');
        const handleChange = (event) => {
          const file = event.target.files[0];
          setImageUrl(URL.createObjectURL(file));
        }
    return(
      <div class="user-setting-container">
        <h2>Your Profile</h2>
        <label htmlFor="">Change Your Avatar</label>
        <div class="profile-picture-container">
          {imageUrl && <img id="previewAvatar" src={imageUrl} />}
          <input type="file" onChange={handleChange} />
        </div>
        <label htmlFor="">User Name</label>                     
        <input type="text" placeholder='User Name'/>
        <label htmlFor="" >Email</label>                     
        <input type="text" placeholder='Email'/>
        <label htmlFor="">Date of Birth</label>                     
        <input type="date"/>
        <label htmlFor="">Major</label>
        <select name="" id="">
          <option value="">Information and Communications Technology</option>
          <option value="">Space and Applications</option>
          <option value="">Water Environment Oceanography</option>
          <option value="">Advanced Mterials Science and Nanotechnology</option>
        </select>
        <label htmlFor="">Password</label>  
        <input type="password" id="password" name="password" value='Tuancuong25112001'/>
        <div className="user-password-container">
          <button class="showpass_btn" type="button" onClick={showPassword}>Show Password</button>
          <button class="changepass_btn" type="button">Change Password</button>
        </div>
        <div className="user-profile-savechange-container">
          <button className='user-profile-savechange'>Save</button>
        </div>
                    
      </div>
    );

}

export {
  // LandingPage,
  Homepage,
  Project,
}
