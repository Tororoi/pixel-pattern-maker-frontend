import React, { Component } from 'react';

//Parents: App

class Form extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props
    let {username, password} = this.state

    return (
      <div className="login-page">
        <form className="login-container" onSubmit={this.handleSubmit}>
          <h1>{formName}</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }

}

export default Form;