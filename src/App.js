import React, { Component } from "react";
import "./App.css";
import getStationData from "./services/getStationData";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { formatAddress, getLatLng } from "./services/geocode";
import Map from "./components/Map";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { withRouter, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      originAddress: "",
      destination: "",
      destinationAddress: "",
      stations: [],
      originLatLng: null,
      destinationLatLng: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit() {
    let stations;
    if (!this.state.station) {
      stations = await getStationData();
    }
    const origin = await formatAddress(this.state.origin);
    const destination = await formatAddress(this.state.destination);
    this.setState({
      stations,
      origin: "",
      destination: "",
      originAddress: origin.formatAddress,
      originLatLng: [origin.geometry.location.lng, origin.geometry.location.lat],
      destinationAddress: destination.formatAddress,
      destinationLatLng: [destination.geometry.location.lng, destination.geometry.location.lat]
    });
    this.props.history.push("/results");
  }

  render() {
    const {
      origin,
      originAddress,
      destination,
      destinationAddress,
      originLatLng,
      destinationLatLng,
      stations
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
          handleSubmit={this.handleSubmit}
        />
        
        <Map
          originLatLng={originLatLng}
          destinationLatLng={destinationLatLng}
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

export default withRouter(App);
