const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "final_project",
    port: 3307,
}) 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// Get user by user_mail
app.get("/get_user/user_mail/:user_mail", (req, res) => {
    const {user_mail} = req.params;
    const sqlGetUserUserMail = "SELECT * FROM user WHERE user_mail=?";
    db.query(sqlGetUserUserMail, user_mail, (err, result) => {
        if (err) {
            console.log("Get user by mail error: ",err);
        }
    res.send(result);
    });
});

//Get user by user_code
app.get("/get_user/user_code/:user_code", (req, res) => {
    const {user_code} = req.params;
    const sqlGetUserUserCode = "SELECT * FROM user WHERE user_code=?";
    db.query(sqlGetUserUserCode, user_code, (err, result) => {
        if (err) {
            console.log("Get user by code error: ",err);
        }
    res.send(result);
    });
});

//Get project by user_code (not leader)
app.get("/get_project/user_code/:user_code", (req, res) => {
    const {user_code} = req.params;
    const sqlGetProjectUserCode = "CALL pu("+user_code+")";
    db.query(sqlGetProjectUserCode, user_code, (err, result) => {
        if (err) {
            console.log("Get project by user code error: ",err);
        }
    res.send(result[0]);
    });
});

//Get project by user_code (is leader)
app.get("/get_project1/user_code/:user_code", (req, res) => {
    const {user_code} = req.params;
    const sqlGetProjectUserCode = "SELECT * FROM project WHERE project_leader = ?";
    db.query(sqlGetProjectUserCode, user_code, (err, result) => {
        if (err) {
            console.log("Get project by user code error: ",err);
        }
    res.send(result);
    });
});

// Get project name by project code
app.get("/get_project/project_code/:project_code", (req, res) => {
    const {project_code} = req.params;
    const sqlGetProjectProjectCode = `SELECT project_name FROM project WHERE project_code= "`+project_code+`"`;
    db.query(sqlGetProjectProjectCode, (err, result) => {
        if (err) {
            console.log("Get project name by project code error: ",err);
        }
    res.send(result);
    });
});

//Get user's tasks by user_code
app.get("/get_task/user_code/:user_code", (req, res) => {
    const {user_code} = req.params;
    const sqlGetTaskUserCode = "CALL utu("+user_code+")";
    db.query(sqlGetTaskUserCode, (err, result) => {
        if (err) {
            console.log("Get task by user code error: ",err);
        }
    res.send(result[0]);
    });
});

//Get project's tasks by project_code
app.get("/get_task/project_code/:project_code", (req, res) => {
    const {project_code} = req.params;
    const sqlGetTaskProjectCode = `CALL ptp("`+project_code+`")`;
    db.query(sqlGetTaskProjectCode, (err, result) => {
        if (err) {
            console.log("Get task by project code error: ",err);
        }
    res.send(result[0]);
    });
});

//Get project's sprints by project_code
app.get("/get_sprint/project_code/:project_code", (req, res) => {
    const {project_code} = req.params;
    const sqlGetUserUserCode = "SELECT * FROM sprint WHERE project_code=? ORDER BY sprint_start_date";
    db.query(sqlGetUserUserCode, project_code, (err, result) => {
        if (err) {
            console.log("Get sprint by project code error: ",err);
        }
    res.send(result);
    });
});

//Get project's member by project_code
app.get("/get_member/project_code/:project_code", (req, res) => {
    const {project_code} = req.params;
    const sqlGetMemberProjectCode = `CALL up("`+project_code+`")`;
    db.query(sqlGetMemberProjectCode, (err, result) => {
        if (err) {
            console.log("Get project's member by project code error: ",err);
        }
    res.send(result[0]);
    });
});

// Get sprint count
app.get("/sprint_count", (req, res) => {
    const sqlGetMemberProjectCode = `SELECT COUNT(sprint_code) AS numberSprint FROM sprint`;
    db.query(sqlGetMemberProjectCode, (err, result) => {
        if (err) {
            console.log("Get sprint count error: ",err);
        }
    res.send(result[0]);
    });
});

// Add new member to project
app.post("/add_member", (req, res) => {
    const user_code = req.body.memberAdd;
    const project_code = req.body.projectAdd;
    const sqlAddMember = "INSERT INTO project_member (user_code, project_code) VALUES (?, ?)";
    db.query(sqlAddMember, [user_code, project_code], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});
    
// Add new sprint to project
app.post("/add_sprint", (req, res) => {
    const project_code = req.body.project
    const sprint_start_date = req.body.startDate;
    const sprint_due_date = req.body.dueDate;
    const sprint_code = req.body.nextSprint;
    const sqlAddSprint = "INSERT INTO sprint (project_code, sprint_code, sprint_start_date, sprint_due_date) VALUES (?, ?, ?, ?)";
    db.query(sqlAddSprint, [project_code, sprint_code, sprint_start_date, sprint_due_date], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

// Add new task to project
app.post("/add_task", (req, res) => {
    const task_name = req.body.issueName;
    const task_start_date = req.body.issueStartDate;
    const task_due_date = req.body.issueDueDate;
    const task_description = req.body.issueDescription;
    const task_priority = req.body.issuePriority;
    const user_code = req.body.userCode;
    const sprint_code = req.body.curSprint;
    const state = req.body.newIssueState;

    const sqlAddTask = "INSERT INTO task (task_name, task_start_date, task_due_date, task_description, task_priority, user_code, sprint_code, state) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlAddTask, [task_name, task_start_date, task_due_date, task_description, task_priority, user_code,sprint_code, state], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

// Add new project to homepage
app.post("/add_project", (req, res) => {
    const project_name = req.body.newProjectName;
    const project_type = req.body.newProjectType;
    const project_description = req.body.newProjectDescription;
    const project_created_date = req.body.newProjectCreatedDate;
    const project_leader = req.body.newProjectLeader;
    const sqlAddProject = "INSERT INTO project (project_name, project_type, project_description, project_created_date, project_leader) VALUES (?, ?, ?, ?,?)";
    db.query(sqlAddProject, [project_name, project_type, project_description, project_created_date, project_leader], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

// Update profile
app.put("/update_profile/:user_code", (req, res) => {
    const {user_code} = req.params;
    const {user_name, user_email, user_dob, user_password, user_description} = req.body;
    const sqlUpdate = "UPDATE user SET user_name=?, user_email=?, user_dob=?, user_password=?, user_description WHERE id=?";
    db.query(sqlUpdate, [user_name, user_email, user_dob, user_password, user_description,user_cde], (err, result) => {
        if (err) {
            console.log(err);
        } 
        res.send(result);
    });
});

// Update project (ip)
app.put("/update_project/:project_code", (req, res) => {
    const {project_code} = req.params;
    const {project_name,project_type , project_description } = req.body;
    const sqlUpdate = "UPDATE project SET project_name=?,project_type = ?, project_description = ? WHERE id=?";
    db.query(sqlUpdate, [project_name,project_type , project_description, project_code], (err, result) => {
        if (err) {
            console.log(err);
        } 
        res.send(result);
    });
});

// Update task (except state)
app.put("/update_task", (req, res) => {
    const task_code = req.body.task_code;
    const task_name = req.body.task_name;
    const task_description = req.body.task_description;
    const sqlUpdate = "UPDATE task SET task_name=?, task_description=? WHERE task_code=?";
    db.query(sqlUpdate, [task_name,  task_description, task_code], (err) => {
            console.log(err);
    });
});

// Delete sprint
app.delete("/delete_sprint/:sprint_code", (req, res) => {
    const {sprint_code} = req.params;
    const sqlDeleteSprint = "DELETE FROM sprint WHERE sprint_code="+sprint_code;
    db.query(sqlDeleteSprint, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

//Delete task
app.delete("/delete_task/:task_code", (req, res) => {
    const {task_code} = req.params;
    const sqlDeleteTask = "DELETE FROM task WHERE task_code="+task_code;
    db.query(sqlDeleteTask, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

//Delete member from project (ip)
app.delete("/delete_member", (req, res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

