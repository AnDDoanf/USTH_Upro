import React from 'react';

import notification from '../../assets/img/notification.svg'
import user from '../../assets/img/user.svg'
import useNavbar from '../../talons/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Header(props) {

  const [userName, setUserName] = useState("");

  const {user_code} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/get_user/user_code/${props.userCode}`)
    .then((res) => {
      res.data.map((item, i) => (
          setUserName(item.user_name)
      ))
    })
    .catch(err => console.log(err));
  }, [props.userCode])
  const talonProps = useNavbar();
    const {handleNavbarToHomePage
            } = talonProps;

    function show_noti(){
        var noti = document.getElementById("notification-dropdown-container");
        document.getElementById("user-dropdown-container").style.display = "none";
        document.getElementById("noti-tooltip").style.visibility = "hidden";
        if(noti.style.display == "none"){
          noti.style.display = "block";
        }
        else{
          noti.style.display = "none";
          document.getElementById("noti-tooltip").style.visibility = "visible";
        }
      }
      
      function show_user(){
        var user = document.getElementById("user-dropdown-container");
        document.getElementById("notification-dropdown-container").style.display = "none";
        document.getElementById("user-tooltip").style.visibility = "hidden";
        if(user.style.display == "none"){
          user.style.display = "block";
        }
        else{
          user.style.display = "none";
          document.getElementById("user-tooltip").style.visibility = "visible";
        }
      }
      function show_search(){
        var search = document.getElementById("search-dropdown-container");
        if(search.style.display == "none"){
          search.style.display = "block";
        }
        else{
          search.style.display = "none";
        }
      }
    return (
        <div className="nav">
        <div onClick={handleNavbarToHomePage} className="logo">Upro</div>

        <div className="search-container">
          <input onClick={show_search} type="search" placeholder="Search"/>
          <div id="search-dropdown-container">
            <div className="search-dropdown-menu">
            <p>Type to search</p>
            </div>
        </div>
      </div>

      <div className="notification">
          <img src ={notification} onClick={show_noti}/>
          <div id="notification-dropdown-container">
            <div id='notification-dropdown-menu' className="notification-dropdown-menu">
                <a>placeholder</a>
                <a>placeholder</a>
                <a>placeholder</a>
            </div>
          </div>
          <div id="noti-tooltip" className="noti-tooltip">
            <p>Notification</p>
          </div>
      </div>  

      <div className="user">
          <img src ={user} onClick={show_user}/>
          <div id="user-dropdown-container">
            <div className="user-dropdown-menu">
              <a>Your Profile</a>
              <a>Setting</a>
              <a>Sign out</a>
            </div>
          </div>
          <div id="user-tooltip" className="user-tooltip">
            <p>User</p>
          </div>
      </div>
    </div>
    );
}

export default Header;