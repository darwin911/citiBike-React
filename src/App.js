import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { formatAddress, getStationData } from './services/helper';
import { MapContainer } from './components/MapContainer';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
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
      stations: [],
      radius: 0.00375,
      resultStations: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    const stations = await getStationData();
    // shuffles stationsList https://github.com/Daplie/knuth-shuffle/blob/master/index.js
    const suffledStations = knuthShuffle(stations);
    this.setState(prevState => ({ ...prevState, stations: suffledStations }));
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
        text: '',
        address: origin.formatted_address,
        lnglat: originLngLat
      },
      destination: {
        text: '',
        address: destination.formatted_address,
        lnglat: destinationLngLat
      }
    }));

    this.props.history.push('/results');
    this.setIsLoading();
    return this.filterStations(originLngLat, destinationLngLat);
  };

  getResultStations = location => {
    const { stations, radius } = this.state;
    return stations.filter(
      station =>
        Math.abs(station.latitude - location[1]) <= radius &&
        Math.abs(station.longitude - location[0]) <= radius
    );
  };

  filterStations(origin, destination) {
    const originStations = this.getResultStations(origin);
    const destinationStations = this.getResultStations(destination);

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
      resultStations: [...originStations, ...destinationStations]
    }));
  }

  setIsLoading = () => {
    this.setState(prevState => ({
      ...prevState,
      isLoading: !prevState.isLoading
    }));
  };

  render() {
    const {
      origin,
      destination,
      stations,
      resultStations,
      isLoading
    } = this.state;
    return (
      <main className='App'>
        <Header />

        <section className='section-info'>
          <h2>Bike Availability</h2>
          <p>
            Input your origin and destination to find see bike availability.
          </p>
        </section>
        <SearchBar
          origin={origin}
          destination={destination}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isLoading={isLoading}
          setIsLoading={this.setIsLoading}
        />
        {stations ? (
          <MapContainer stations={stations} resultStations={resultStations} />
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
      </main>
    );
  }
}

export default withRouter(App);
