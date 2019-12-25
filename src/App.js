import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { formatAddress, getStationData } from './services/helper';
import { Map } from './components/Map';
import Results from './components/Results';
import Footer from './components/Footer';
import { withRouter, Route } from 'react-router-dom';
import { knuthShuffle } from 'knuth-shuffle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {
        text: '',
        address: '',
        lnglat: [null, null],
        stations: null
      },
      destination: {
        text: '',
        address: '',
        lnglat: [null, null],
        stations: null
      },
      stations: null,
      radius: 0.00375,
      isOriginSet: false,
      isDestinationSet: false
    };
  }

  async componentDidMount() {
    const stations = await getStationData();
    // shuffles stationsList https://github.com/Daplie/knuth-shuffle/blob/master/index.js
    const suffledStations = knuthShuffle(stations);
    this.setState(prevState => ({ ...prevState, stations: suffledStations }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    // replaces input fields, sets formatted address and coordinates of origin and destination
    this.setState(prevState => ({
      ...prevState,
      origin: {
        text: origin.formatted_address,
        address: origin.formatted_address,
        lnglat: originLngLat
      },
      destination: {
        text: destination.formatted_address,
        address: destination.formatted_address,
        lnglat: destinationLngLat
      }
    }));

    this.filterStations(originLngLat, destinationLngLat);

    this.props.history.push('/results');
  };

  filterStations(origin, destination) {
    const { stations, radius } = this.state;

    const originStations = stations.filter(
      station =>
        Math.abs(station.latitude - origin[1]) <= radius &&
        Math.abs(station.longitude - origin[0]) <= radius
    );

    const destinationStations = stations.filter(
      station =>
        Math.abs(station.latitude - destination[1]) <= radius &&
        Math.abs(station.longitude - destination[0]) <= radius
    );

    this.setState(prevState => ({
      ...prevState,
      origin: {
        ...prevState.origin,
        stations: originStations
      },
      destination: {
        ...prevState.destination,
        stations: destinationStations
      },
      isOriginSet: true,
      isDestinationSet: true
    }));
  }

  getRandomStart = size => {
    // gets random val between 0 and max station val
    let { stations } = this.state;
    if (stations) {
      return parseInt(Math.random() * (stations.length - size));
    } else {
      return 0;
    }
  };

  reducedStations = size => {
    let { stations } = this.state;
    if (!size) size = stations.length;
    if (stations) {
      let start = this.getRandomStart(size);
      console.log(start, start + size, 'total', start + size - start);
      return stations.slice(start, start + size);
    } else {
      return null;
    }
  };

  render() {
    const {
      origin,
      destination,
      isOriginSet,
      isDestinationSet,
      stations
    } = this.state;
    return (
      <div className='App'>
        <Header />
        <SearchBar
          origin={origin}
          destination={destination}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {stations ? (
          <Map
            origin={origin.lnglat}
            destination={destination.lnglat}
            stations={this.reducedStations(300)}
            isOriginSet={isOriginSet}
            isDestinationSet={isDestinationSet}
          />
        ) : (
          <h1>LOADING STATIONS</h1>
        )}
        <Route
          path='/results'
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
