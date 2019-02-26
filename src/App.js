import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Main from './components/Main';
import StationList from './components/StationList';
import Nav from './components/Nav';
import getGeocode from './services/getGeocode';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      origin: '10 E 21st St, New York, NY 10010',
      originLatLng: '',
      destination: '30 Water St, New York, NY 10004',
      destinationLatLng: '',
      defaultZoom: 11,
      defaultCenter: {
        lat: 40.783874,
        lng: -73.965101
      },
      isMarkerShown: true,
      mapTypeId: 'roadmap'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const stations = await getStationData()
    const originLatLng = await getGeocode(this.state.origin);
    const destinationLatLng = await getGeocode(this.state.destination);
    console.log(destinationLatLng)
    this.setState({
      stations, 
      origin: '10 E 21st St, New York, NY 10010',
      originLatLng,
      destinationLatLng,
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
        <Main state={this.state}/>
        <Nav
          origin={this.state.origin}
          destination={this.state.destination}
          handleChange={this.handleChange}/>
        <div className="origin">
          <h3>Origin</h3>
          <p>Lat: {this.state.originLatLng.lat}</p>
          <p>Lng: {this.state.originLatLng.lng}</p>
        </div>
        <div className="destination">
          <h3>Destination</h3>
          <p>Lat: {this.state.destinationLatLng.lat}</p>
          <p>Lng: {this.state.destinationLatLng.lng}</p>
        </div>
        <StationList stationList={this.state.stations}/>
      </div>
    );
  }
}

export default App;
