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
      origin: {
        text: "",
        address: "",
        lat: null,
        lng: null
      },
      destination: {
        text: "",
        address: "",
        lat: null,
        lng: null
      },
      stations: []
    };
  }

  async componentDidMount() {
    const stations = await getStationData();
    this.setState({ stations });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        text: value
      }
    }));
  };

  handleSubmit = async () => {
    const origin = await formatAddress(this.state.origin.text);
    const destination = await formatAddress(this.state.destination.text);
    this.setState({
      origin: {
        text: "",
        address: origin.formatted_address,
        lnglat: [origin.geometry.location.lng, origin.geometry.location.lat]
      },
      destination: {
        text: "",
        address: destination.formatted_address,
        lnglat: [
          destination.geometry.location.lng,
          destination.geometry.location.lat
        ]
      }
    });
    this.props.history.push("/results");
  };

  render() {
    const { origin, destination, stations } = this.state;
    return (
      <div className="App">
        <Header />

        <SearchBar
          origin={origin}
          destination={destination}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <Map
          originLngLat={origin.lnglat}
          destinationLngLat={destination.lnglat}
        />

        <Route
          path="/results"
          render={props => (
            <Results
              {...props}
              origin={origin}
              destination={destination}
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
