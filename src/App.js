import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Main from './components/Main';
import StationList from './components/StationList';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      origin: '',
      destination: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const stations = await getStationData()
    this.setState({
      stations, 
      isMarkerShown: true,
      center: {
        lat: 40.867768,
        lng: -73.929896
      }
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main props={this.state}/>
        <Nav
          handleChange={this.handleChange}/>
        <StationList stationList={this.state.stations}/>
      </div>
    );
  }
}

export default App;
