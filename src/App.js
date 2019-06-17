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
        lnglat: [null, null]
      },
      destination: {
        text: "",
        address: "",
        lnglat: [null, null]
      },
      stations: [],
      moreDetails: false,
      radius: 0.00375
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

  toggleDetails = e => this.setState({ moreDetails: !this.state.moreDetails });

  render() {
    const { origin, destination, stations, moreDetails, radius } = this.state;
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
            <Results
              {...props}
              origin={origin}
              destination={destination}
              toggleDetails={this.toggleDetails}
              moreDetails={moreDetails}
              stationList={stations}
              radius={radius}
            />
          )}
        />

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
