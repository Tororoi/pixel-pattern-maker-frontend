import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import Form from './Components/Form'
import DrawContainer from './Components/DrawContainer'
import PatternContainer from './Components/PatternContainer'

import {connect} from 'react-redux'

// Routing Stuff
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {

  componentDidMount() {
    fetch("http://localhost:3000/patterns")
    .then(r => r.json())
    .then((arrayOfPatterns) => {
      this.props.setAllPatterns(arrayOfPatterns);
    })

    if (localStorage.token) {
      this.props.persistUser()
    }
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }


  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser({
      user: {
        id: 0,
        username: "",
        user_patterns: [],
        favorite_patterns: []
      },
      token: ""
    })
    this.props.history.push("/");
  
  }

  handleResponse = (resp) => {  
    if (resp.jwt) {
      localStorage.token = resp.jwt
      this.props.setUserInfo(resp)
    }
  }


  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }


  render(){
    // console.log(this.props)
    return (
      <div className="App">
        <NavBar handleLogout={this.handleLogout}/>
        <Switch>
          <Route path="/login" render={this.renderForm} />
          <Route path="/register" render={this.renderForm} />
          <Route path="/draw" exact render={() => <div> 
            <DrawContainer savePattern={this.props.savePattern}/> 
            </div>} />
          <Route path="/" exact render={() => <div> 
            <PatternContainer /> 
            </div>
          } />
        </Switch>

      </div>
    );
  }

} // End of Component

// thunky Action Creators
let persistUser = () => {
  return (dispatch) => {
    fetch("http://localhost:3000/persist", {
      headers: {
        "Authorization": `bearer ${localStorage.token}`
      }
    })
      .then(r => r.json())
      .then(resp => {
        localStorage.token = resp.jwt
        dispatch(setUserInfo(resp))
      })
  }
}

let savePattern = (newPattern) => {
  return (dispatch) => {
    fetch("http://localhost:3000/patterns", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      },
      body: JSON.stringify(newPattern)
    })
      .then(r => r.json())
  }
}

// regular Action Creators
let setAllPatterns = (patternsArr) => {
  return {
    type: "SET_ALL_PATTERNS",
    payload: patternsArr
  }
}

let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFORMATION",
    payload: userInfo
  }
}

let sendThisInformation = { setAllPatterns, setUserInfo, persistUser, savePattern }


export default connect(null, sendThisInformation)(App);