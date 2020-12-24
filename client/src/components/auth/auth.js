import React, { Component } from 'react';
import axios from 'axios';
import './auth.css';

export default class Auth extends Component {

  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  };

  onRegisterHandler = () => {
    axios.post("/api/auth/register", {...this.state})
      .then((data) => window.M.toast({ html: data.data.message }))
      .catch(e => window.M.toast({ html: e.response.data.message }));
  };

  onLoginHandler = () => {
    axios.post("/api/auth/login", {...this.state})
    .then((data) => {
      const { token, userId } = data.data;
      this.props.loginStoreToken(token, userId);
    })
    .catch(e => window.M.toast({ html: e.response.data.message }));
  };

  render() {

    return (
      <div className="auth-page">
        <div className="row">
          <div className="col s12 m6">
            <div className="card light-blue accent-3">
              <div className="card-content white-text">
                <span className="card-title">Auth</span>
                <form>
                  <div className="input-field">
                    <input 
                      onChange={this.handleChange}
                      id="email" 
                      type="email"
                      name="email"
                      className="validate"
                      autoComplete="current-email" />
                    <label 
                      htmlFor="email" 
                      className="grey-text text-darken-2">
                        Email
                    </label>
                  </div>
                  <div className="input-field">
                    <input 
                      onChange={this.handleChange}
                      id="password" 
                      type="password"
                      name="password"
                      className="validate" 
                      autoComplete="current-password" />
                    <label 
                      htmlFor="password" 
                      className="grey-text text-darken-2">
                        Password
                    </label>
                  </div>
                </form>
              </div>
              <div className="card-action">
                <button 
                  onClick={this.onLoginHandler} 
                  className="btn login-btn green darken-1">
                    Login
                </button>
                <button 
                  onClick={this.onRegisterHandler} 
                  className="btn register-btn orange darken-1">
                    Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
