import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from "../header/header";
import Auth from '../auth/auth';
import Form from '../form/form';
import 'materialize-css';
import './app.css';

export default class App extends Component {

  state = {
    data: [],
    token: null,
    userId: null,
    isLoggedIn: false
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("userData"));
    if ( data && data.token ) {
      this.loginStoreToken(data.token, data.userId);
    }
  };

  loginStoreToken = (token, userId) => {
    this.setState({ token, userId, isLoggedIn: true });
    localStorage.setItem("userData", JSON.stringify({ token, userId }));
  };

  logoutDeleteToken = () => {
    this.setState({ token: null, userId: null, isLoggedIn: false });
    localStorage.removeItem("userData");
  };

  render() {

    const { isLoggedIn } = this.state;

    return (
      <div className="App">
        <Router>
          <Switch>
          { 
          isLoggedIn ? 
            (
              <>
              <Route path="/form" exact>
                <Header logoutDeleteToken={this.logoutDeleteToken} />
                <Form onItemAdded={this.addItem}
                      clearData={this.clearData}
                      getPost={this.getPost} />
              </Route>
              <Redirect to="/form" />
              </>
              ) : (
              <>
              <Route path="/auth" exact>
                <Auth loginStoreToken={this.loginStoreToken} />
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
