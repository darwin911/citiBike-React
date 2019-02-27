import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Main from './components/Main';
import { OriginStations, DestinationStations } from './components/StationList';
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
      defaultZoom: 14,
      defaultCenter: {
        lat: 40.783874,
        lng: -73.965101
      },
      directions: null,
      isMarkerShown: true,
      mapTypeId: 'roadmap',
      travelMode: 'BICYCLING '
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const stations = await getStationData()

    this.setState({
      stations
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
    console.log('origin: ', originLatLng, 'destination', destinationLatLng)
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

        {this.state.originLatLng &&
          <section>
            <OriginStations
            originLatLng={this.state.originLatLng}
            stationList={this.state.stations}/>
            <DestinationStations
            destinationLatLng={this.state.destinationLatLng}
            stationList={this.state.stations}/>
          </section>
        }
        
      </div>
    );
  }
}

export default App;
