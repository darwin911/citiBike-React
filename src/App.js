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
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      bearing: [],
      stations: [],
      originLatLng: null,
      destinationLatLng: null,
      defaultZoom: [11],
      center: [-73.989885, 40.73997]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const stations = await getStationData();
    this.setState({ stations });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit() {
    const originAddress = await formatAddress(this.state.origin);
    const destinationAddress = await formatAddress(this.state.destination);
    const originLatLng = await getLatLng(originAddress);
    const destinationLatLng = await getLatLng(destinationAddress);
    this.setState({
      origin: "",
      destination: "",
      originAddress,
      originLatLng: [originLatLng.lng, originLatLng.lat],
      destinationAddress,
      destinationLatLng: [destinationLatLng.lng, destinationLatLng.lat]
    });
    this.props.history.push("/results");
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
          bearing={bearing}
          originLatLng={originLatLng}
          destinationLatLng={destinationLatLng}
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

export default withRouter(App);
