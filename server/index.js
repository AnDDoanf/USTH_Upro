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

//Get project by user_code
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
    const sqlGetUserUserCode = "SELECT * FROM sprint WHERE project_code=?";
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



app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

