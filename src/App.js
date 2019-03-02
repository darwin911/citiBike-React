import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Nav from './components/Nav';
import { formatAddress, getLatLng } from './services/geocode';
import Map from './components/Map';
import { Route } from 'react-router-dom';
import Results from './components/Results';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      originLatLng: null,
      destinationLatLng: null,
      defaultZoom: [11],
      defaultCenter: [-73.989885, 40.739970]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const stations = await getStationData()
    this.setState({
      stations
    })
  }

  async handleSubmit(origin, destination) {
    const originAddress = await formatAddress(origin);
    const destinationAddress = await formatAddress(destination);
    const originLatLng = await getLatLng(originAddress);
    const destinationLatLng = await getLatLng(destinationAddress);
    this.setState({
      originAddress,
      originLatLng: [originLatLng.lng, originLatLng.lat],
      destinationAddress,
      destinationLatLng: [destinationLatLng.lng, destinationLatLng.lat]
    })
  }

  render() {

    return (
      <div className="App">

        <Header />

        <Nav
          origin={this.state.origin}
          originAddress={this.state.originAddress}
          destination={this.state.destination}
          destinationAddress={this.state.destinationAddress}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit} />

        <Map
          origin={this.state.originLatLng}
          destination={this.state.destinationLatLng}
          zoom={this.state.defaultZoom}
          defaultCenter={this.state.defaultCenter} />

        <Route path="/results" render={(props) => (

          <Results
            {...props}
            origin={this.state.originAddress}
            destination={this.state.destinationAddress}
            originLatLng={this.state.originLatLng}
            destinationLatLng={this.state.destinationLatLng}
            stationList={this.state.stations} />
        )} />

      </div>
    );
  }
}

export default App;
