import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onChangeUser, registerUser, loginUser, resetUserState } from '../../redux/actions/user';
import './auth.css';

class Auth extends Component {

  handleChange = e => {
    this.props.onChangeUser(e.target.name, e.target.value);
  };

  onRegisterHandler = () => {
    this.props.registerUser();
    this.props.resetUserState();
  };

  onLoginHandler = () => {
    this.props.loginUser();
    this.props.resetUserState();
  };

  render() {
    
    const { email, password } = this.props;

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
                      value={email}
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
                      value={password}
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

const mapStateToProps = state => {
  return {
    email: state.user.email,
    password: state.user.password
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeUser: (name, value) => dispatch(onChangeUser(name, value)),
    registerUser: () => dispatch(registerUser()),
    loginUser: () => dispatch(loginUser()),
    resetUserState: () => dispatch(resetUserState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
