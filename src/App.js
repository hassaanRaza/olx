import React, { Component } from 'react';
import './App.css';
import {BasicExample as Routes} from './config/Routes';



class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Routes/>
      </div>

    );
  }
}

export default App;
