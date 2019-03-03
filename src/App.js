import React, { Component } from 'react';
import './App.css';
import { BasicExample as Routes } from './config/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
