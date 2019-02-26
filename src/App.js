import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Main from './components/Main';
import StationList from './components/StationList';
import Nav from './components/Nav';
import { formatAddress, getLatLng } from './services/geocode';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      origin: '',
      originLatLng: null,
      destination: '',
      destinationLatLng: null,
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

    this.setState({
      stations, 
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

  async handleSubmit(e) {
    e.preventDefault();
    const originAddress = await formatAddress(this.state.origin);
    const destinationAddress = await formatAddress(this.state.destination);
    const originLatLng = await getLatLng(originAddress);
    const destinationLatLng = await getLatLng(destinationAddress);
    console.log(originLatLng, destinationLatLng)
    this.setState({
      origin: '',
      originAddress,
      originLatLng,
      destination: '',
      destinationAddress,
      destinationLatLng
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main state={this.state}/>
        <Nav
          origin={this.state.origin}
          destination={this.state.destination}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit}/>
        <div className="origin">
          <h3>Origin: {this.state.originAddress}</h3>
          <p>Latitude: {(this.state.originLatLng) ? this.state.originLatLng.lat : ''}</p>
          <p>Longitude: {(this.state.originLatLng) ? this.state.originLatLng.lng : ''}</p>
        </div>
        <div className="destination">
          <h3>Destination: {this.state.destinationAddress}</h3>
          <p>Latitude: {(this.state.destinationLatLng) ? this.state.destinationLatLng.lat : ''}</p>
          <p>Longitude: {(this.state.destinationLatLng) ? this.state.destinationLatLng.lng : ''}</p>
        </div>
        <StationList stationList={this.state.stations}/>
      </div>
    );
  }
}

export default App;
