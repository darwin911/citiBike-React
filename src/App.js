import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { formatAddress, getStationData } from "./services/helper";
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
        lnglat: [null, null],
        stations: []
      },
      destination: {
        text: "",
        address: "",
        lnglat: [null, null],
        stations: []
      },
      stations: [],
      radius: 0.00375
    };
  }

  async componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => console.log(coords),
        error => console.error(error)
      );
    } else {
      /* geolocation IS NOT available */
      // this.setState({ center: [-122.418701, 37.769047] });
    }
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
    // Geocodes user input and returns object with formatted address and coordinates (longitude and latitude)
    const origin = await formatAddress(this.state.origin.text);
    const destination = await formatAddress(this.state.destination.text);
    // creates array object with coords with mapbox specifications (array[lng,lat])
    const originLngLat = [
      origin.geometry.location.lng,
      origin.geometry.location.lat
    ];
    const destinationLngLat = [
      destination.geometry.location.lng,
      destination.geometry.location.lat
    ];
    // clears input fields, sets formatted address and coordinates of origin and destination
    this.setState({
      origin: {
        text: "",
        address: origin.formatted_address,
        lnglat: originLngLat
      },
      destination: {
        text: "",
        address: destination.formatted_address,
        lnglat: destinationLngLat
      }
    });
    this.filterStations(originLngLat, destinationLngLat);
    this.props.history.push("/results");
  };

  filterStations(origin, destination) {
    const { stations, radius } = this.state;
    this.setState(prevState => ({
      origin: {
        ...prevState.origin,
        stations: stations.filter(
          stn =>
            Math.abs(stn.latitude - origin[1]) <= radius &&
            Math.abs(stn.longitude - origin[0]) <= radius
        )
      },
      destination: {
        ...prevState.destination,
        stations: stations.filter(
          stn =>
            Math.abs(stn.latitude - destination[1]) <= radius &&
            Math.abs(stn.longitude - destination[0]) <= radius
        )
      }
    }));
  }

  render() {
    const { origin, destination } = this.state;
    return (
      <div className="App">
        <Header />

        <SearchBar
          origin={origin}
          destination={destination}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <Map origin={origin.lnglat} destination={destination.lnglat} />

        <Route
          path="/results"
          render={props => (
            <Results {...props} origin={origin} destination={destination} />
          )}
        />

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
