import React, { Component } from "react";
import "./App.css";
import getStationData from "./services/getStationData";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { formatAddress } from "./services/geocode";
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
      destinationLatLng: null
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
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
      originAddress: origin.formatted_address,
      originLatLng: [
        origin.geometry.location.lng,
        origin.geometry.location.lat
      ],
      destinationAddress: destination.formatted_address,
      destinationLatLng: [
        destination.geometry.location.lng,
        destination.geometry.location.lat
      ]
    });
    this.props.history.push("/results");
  };

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

        <SearchBar
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
