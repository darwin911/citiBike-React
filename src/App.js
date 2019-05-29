import React, { Component } from "react";
import "./App.css";
import getStationData from "./services/getStationData";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { formatAddress, getLatLng } from "./services/geocode";
import Map from "./components/Map";
import { Route } from "react-router-dom";
import Results from "./components/Results";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bearing: [30],
      stations: [],
      originLatLng: null,
      destinationLatLng: null,
      defaultZoom: [11],
      center: [-73.989885, 40.73997]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const stations = await getStationData();
    this.setState({ stations });
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
    });
  }

  render() {
    const {
      origin,
      originAddress,
      destination,
      destinationAddress,
      bearing,
      originLatLng,
      destinationLatLng,
      defaultZoom,
      center,
      stations,
    } = this.state;
    return (
      <div className="App">
        <Header />

        <Nav
          origin={origin}
          originAddress={originAddress}
          destination={destination}
          destinationAddress={destinationAddress}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

        <Map
          bearing={bearing}
          origin={originLatLng}
          destination={destinationLatLng}
          zoom={defaultZoom}
          center={center}
        />

        <Route
          path="/results"
          render={props => (
            <Results
              {...props}
              origin={originAddress}
              destination={destinationAddress}
              originLatLng={originLatLng}
              destinationLatLng={destinationLatLng}
              stationList={stations}
            />
          )}
        />

        <Footer />
      </div>
    );
  }
}

export default App;
