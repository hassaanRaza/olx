import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from '../screens/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Header from '../components/Header';
import Profile from '../components/Profile';

const BasicExample = () => (
    <Router>
        <div>
            <Header/>
            <PrivateRoute exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
        </div>
    </Router>
);

const authInfo = {
    isAuthenticated: !!localStorage.getItem('currentUser'),
    login: function(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isAuthenticated = true
    },
    logout: function(){
        localStorage.removeItem("currentUser");
        this.isAuthenticated = false
    }
  }

  const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route 
    {...rest}
    render={props => 
    authInfo.isAuthenticated ? (
      <Component {...props} />
    ): (
      <Redirect
        to={{
          pathname: "/login",
          state: {from: props.location}
        }}
        />
    )
  }
  />
  );

  const AuthRoute = ({ component: Component, ...rest}) => (
    <Route 
    {...rest}
    render={props => 
    !authInfo.isAuthenticated ? (
      <Component {...props} />
    ): (
      <Redirect
        to={{
          pathname: "/",
          state: {from: props.location}
        }}
        />
    )
  }
  />
  );
export {BasicExample, authInfo};