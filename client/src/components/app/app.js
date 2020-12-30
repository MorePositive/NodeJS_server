import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginStoreToken } from '../../redux/actions/user';
import Header from "../header/header";
import Auth from '../auth/auth';
import Form from '../form/form';
import 'materialize-css';
import './app.css';

class App extends Component {

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("userData"));
    if ( data && data.token ) {
      this.props.loginStoreToken(data.token, data.userId);
    }
  };

  render() {

    const { isLoggedIn } = this.props;

    return (
      <div className="App">
        <Router>
          <Switch>
          { 
          isLoggedIn ? 
            (
              <>
              <Route path="/form" exact>
                <Header />
                <Form />
              </Route>
              <Redirect to="/form" />
              </>
              ) : (
              <>
              <Route path="/auth" exact>
                <Auth />
              </Route>
              <Redirect to="/auth" />
              </>
            )
          }
          </Switch>
        </Router>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userId: state.user.userId,
    isLoggedIn: state.user.isLoggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loginStoreToken: (token, userId) => dispatch(loginStoreToken(token, userId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
