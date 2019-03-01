import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import Header from './components/Header';
import Main from './components/Main';
import { OriginStations, DestinationStations } from './components/StationList';
import Nav from './components/Nav';
import { formatAddress, getLatLng } from './services/geocode';
import Map from './components/Map';
import InfoBox from './components/InfoBox';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      origin: '',
      originLatLng: null,
      destination: '',
      destinationLatLng: null,
      defaultZoom: [11],
      defaultCenter: [-73.965101, 40.783874]
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
      destination: '',
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
        {/* <Main state={this.state} /> */}
        <Nav
          origin={this.state.origin}
          destination={this.state.destination}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit}
          originAddress={this.state.originAddress}
          destinationAddress={this.state.destinationAddress} />

        <Map
          origin={this.state.originLatLng}
          destination={this.state.destinationLatLng}
          zoom={this.state.defaultZoom}
          defaultCenter={this.state.defaultCenter}/>

        {this.state.originAddress && <InfoBox 
              origin={this.state.originAddress}
              destination={this.state.destinationAddress} />}

        {this.state.originLatLng &&
          <section className="stations">
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
