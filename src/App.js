import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import Form from './Components/Form'
import DrawContainer from './Components/DrawContainer'
import PatternContainer from './Components/PatternContainer'
import ProfileContainer from './Components/ProfileContainer'

import {connect} from 'react-redux'

// Routing Stuff
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {

  componentDidMount() {
    this.props.getPatterns()

    if (localStorage.token) {
      this.props.persistUser()
    }
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch(`${props.backendSite}/login`, {
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

    fetch(`${props.backendSite}/users`, {
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
    this.props.setUserInfo({
      user: {
        id: 0,
        username: "",
        patterns: [],
        favorites: []
      },
      token: ""
    })
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

  pickerClickHandler = (e) => {
    //necessary to stop getImageData function from color replace method
    this.props.pickerMouseDown(false)
  }

  render(){
    // console.log(this.props)
    return (
      <div className="App" onMouseUp={this.pickerClickHandler}>
        <NavBar handleLogout={this.handleLogout}/>
          <Switch>
            <Route path="/login" render={this.renderForm} />
            <Route path="/register" render={this.renderForm} />
            <Route path="/draw" exact render={() => 
              <div> <DrawContainer 
                createPattern={this.props.createPattern}
                updatePattern={this.props.updatePattern}
                deletePattern={this.props.deletePattern}
                pickerMouseDownDispatch={this.props.pickerMouseDown}
                setPaletteColorsDispatch={this.props.setPaletteColors}
              /> </div>
              } />
            <Route path="/profile" exact render={() => 
              <div> <ProfileContainer 
                favePattern={this.props.favePattern}
                unFavePattern={this.props.unFavePattern}
                setCurrentPatternDispatch={this.props.setCurrentPattern}
                setPaletteColorsDispatch={this.props.setPaletteColors}
                profileSwitch={this.props.profileSwitch}
              /> </div>
            } />
            <Route path="/" exact render={() => 
              <div> <PatternContainer 
                favePattern={this.props.favePattern}
                unFavePattern={this.props.unFavePattern}
                setCurrentPatternDispatch={this.props.setCurrentPattern}
                setPaletteColorsDispatch={this.props.setPaletteColors}
              /> </div>
            } />
          </Switch>

      </div>
    );
  }

} // End of Component

// thunky Action Creators
let persistUser = () => {
  return (dispatch) => {
    fetch(`${props.backendSite}/persist`, {
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

let getPatterns = () => {
  return (dispatch) => {
    fetch(`${props.backendSite}/patterns`)
    .then(r => r.json())
    .then((arrayOfPatterns) => {
      dispatch(setAllPatterns(arrayOfPatterns));
    })
  }
}

let createPattern = (newPattern) => {
  return (dispatch) => {
    fetch(`${props.backendSite}/patterns`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      },
      body: JSON.stringify(newPattern)
    })
    .then(r => r.json())
    .then((obj) => {
      if (obj.pattern) {
        dispatch(addOnePattern(obj.pattern))
        dispatch(setCurrentPattern(obj.pattern))
      }
    })
  }
}

let updatePattern = (newPattern) => {
  return (dispatch) => {
    fetch(`${props.backendSite}/patterns/${newPattern.pattern.id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      },
      body: JSON.stringify(newPattern)
    })
    .then(r => r.json())
    .then((obj) => {
      if (obj.pattern) {
        dispatch(replacePattern(obj.pattern))
      }
    })
  }
}

let deletePattern = (pattern) => {
  return (dispatch) => {
    fetch(`${props.backendSite}/patterns/${pattern.id}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      }
    })
    .then(r => {
      if (r.ok) {
        dispatch(removePattern(pattern.id))
      }
    })
  }
}

let favePattern = (pat_id) => {
  return (dispatch) => {
    fetch(`${props.backendSite}/favorite`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      },
      body: JSON.stringify({pattern_id: pat_id})
    })
    .then(r => r.json())
    .then((obj) => {
      // console.log(obj)
      if (obj.favorite) {
        dispatch(addFavorite(obj.favorite))
      }
    })
  }
}

let unFavePattern = (favorite) => {
  return (dispatch) => {
    fetch(`${props.backendSite}/favorite`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        "Authorization": `bearer ${localStorage.token}`
      },
      body: JSON.stringify({favorite_id: favorite.id})
    })
    .then((r) => {
      if (r.ok) {
        dispatch(removeFavorite(favorite))
      }
    })
  }
}

// regular Action Creators
let pickerMouseDown = (bool) => {
  return {
      type: "PICKER_MOUSE_DOWN",
      payload: bool
  }
}

let profileSwitch = (string) => {
  return {
      type: "PROFILE_SWITCH",
      payload: string
  }
}

let addFavorite = (pattern) => {
  return {
      type: "ADD_FAVORITE",
      payload: pattern
  }
}

let removeFavorite = (favorite) => {
  return {
      type: "REMOVE_FAVORITE",
      payload: favorite
  }
}

let setCurrentPattern = (pattern) => {
  return {
      type: "SET_CURRENT_PATTERN",
      payload: pattern
  }
}

let addOnePattern = (pattern) => {
  return {
    type: "ADD_ONE_PATTERN",
    payload: pattern
  }
}

let replacePattern = (pattern) => {
  return {
    type: "REPLACE_PATTERN",
    payload: pattern
  }
}

let removePattern = (pattern) => {
  return {
    type: "REMOVE_PATTERN",
    payload: pattern
  }
}

let setAllPatterns = (patternsArr) => {
  return {
    type: "SET_ALL_PATTERNS",
    payload: patternsArr
  }
}

let setPaletteColors = (palette) => {
  return {
    type: "SET_PALETTE_COLORS",
    payload: palette
  }
}

let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFORMATION",
    payload: userInfo
  }
}

const backendSite = "https://pixel-pattern-maker.herokuapp.com"

let sendThisInformation = { 
  pickerMouseDown, 
  setAllPatterns, 
  setUserInfo, 
  persistUser, 
  createPattern, 
  updatePattern, 
  deletePattern, 
  profileSwitch, 
  favePattern, 
  unFavePattern, 
  getPatterns,
  setCurrentPattern,
  setPaletteColors,
  backendSite
}


export default connect(null, sendThisInformation)(App);