import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const NavBar = (props) => {

  return(
    <ul className="nav">
      <li>
        <NavLink to="/">Browse</NavLink>
      </li>
      <li>
        <NavLink to="/draw">Draw</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li> 
      <li>
        <NavLink onClick={props.handleLogout} to="/">Log Out</NavLink>
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