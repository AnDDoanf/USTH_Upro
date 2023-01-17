import React, {useState, useEffect} from 'react'
import "./styles.css";
import axios from "axios";
import useNavbar from '../homepage/talons/navbar';

const initialState = {
    mail: "",
    password: "",
};

const Login = (props) => {
    const talonProps = useNavbar();
    const {handleNavbarToHomePage} = talonProps;
    const [state, setState] = useState(initialState);
    const {mail, password} = state;
    const [pass, setPass] = useState("")
    const [userCode, setUserCode] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3001/get_user/user_mail/${state.mail}`)
        .then((res) => {
            res.data.map((item, i) => (
                setPass(item.user_password),
                setUserCode(item.user_code)
            ))
        })
        .catch(err => console.log(err));
    }, [state.mail]);
    const show = () => {
        var pass_input = document.getElementById("pass-input");
        if(pass_input.type === "password"){
            pass_input.type = "text"
        }
        else{
            pass_input.type = "password"
        }
    }

    const handleLogin = () => {
        props.onSubmit(userCode);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!mail || !password) {
            let user = document.getElementById("user");
            let pass = document.getElementById("pass");
            user.style.background = "#FFD3D3" 
            pass.style.background = "#FFD3D3"
            document.getElementById("alert").innerHTML = "Please enter your username or password!";
        }
        else if (pass === state.password) {
            document.getElementById("alert").innerHTML = "Login Successfully!";
            handleLogin();
            handleNavbarToHomePage();
        } else {
            document.getElementById("alert").innerHTML = "Wrong email or password!"
            let user = document.getElementById("user");
            let pass = document.getElementById("pass");
            user.style.background = "#FFD3D3" 
            pass.style.background = "#FFD3D3"
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    };

    return (
        <div className="login_container">
            <div className="logo">
                <div>
                    <p className="logo1">Welcome back to <b>Upro</b></p> 
                </div>
            </div>
            
            <div className="sign-in-content">
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <p style={{'fontSize': '2rem', 'textAlign':'center', color: '#6D6D6D', 'userSelect': 'none'}}>Sign in to continue</p>
                    <div id="user">
                        <img src="user.svg" alt=""/>
                        <input
                            onChange={handleInputChange}
                            id="mail-input" 
                            className="mail-inpt" 
                            type="text" 
                            name ="mail" 
                            placeholder="Mail" 
                            value={mail || ""}/>
                    </div>
                    <div id="pass">
                        <img src="key.svg" alt=""/>
                        <input
                            onChange={handleInputChange}
                            id="pass-input" 
                            className="pass-inpt" 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password || ""}/>
                        <div className="show-password">
                            <input className="checkbox-showpassword" type="checkbox" onClick={show}/>
                        </div>
                    </div>
                    <div className="alert-content">
                        <p id="alert"></p>
                    </div>
                    <div>
                        <center><button id="btn" className="sign-in-button">Sign in</button></center>
                    </div>
                    <div className="forgot">
                        <center><a href="https://www.youtube.com/">Forgot your password?</a></center>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;