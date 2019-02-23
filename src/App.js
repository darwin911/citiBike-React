import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';

class App extends Component {

  async componentDidMount() {
    await getStationData()
  }
  
  render() {
    return (
      <div className="App">
        <h1>CitiBike React</h1>
      </div>
    );
  }
}

export default App;
