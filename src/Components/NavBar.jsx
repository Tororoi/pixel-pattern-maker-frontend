import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

//Parents: App

const NavBar = (props) => {

  return(
    <ul className="nav">
      <li>
        <NavLink className="navlink" to="/browse">Browse</NavLink>
      </li>
      <li>
        <NavLink className="navlink" to="/draw">Draw</NavLink>
      </li>
      <li>
        <NavLink className="navlink" to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink className="navlink" to="/register">Register</NavLink>
      </li>
      <li style={localStorage.token ? {display: "block"} : {display: "none"}}>
        <NavLink className="navlink" to="/profile">Profile</NavLink>
      </li>
      <li style={localStorage.token ? {display: "block"} : {display: "none"}}>
        <NavLink className="navlink" onClick={props.handleLogout} to="/">Log Out</NavLink>
      </li>
    </ul>
  )
};

const mapStateToProps = (reduxState) => {
    return {
      user: reduxState.userInfo.user
    }
  }
  
  export default connect(mapStateToProps)(NavBar);