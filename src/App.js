import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { formatAddress, getStationData } from './services/helper';
import { MapContainer } from './components/MapContainer';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { withRouter, Route } from 'react-router-dom';
import { CONSTANTS } from './constants';
const { RADIUS } = CONSTANTS;

const App = ({ history }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultStations, setResultStations] = React.useState([]);
  const [stations, setStations] = React.useState([]);
  const [origin, setOrigin] = React.useState({
    text: '',
    address: '',
    lnglat: [null, null],
    stations: null,
  });
  const [destination, setDestination] = React.useState({
    text: '',
    address: '',
    lnglat: [null, null],
    stations: null,
  });

  React.useEffect(() => {
    const loadStationData = async () => {
      const stationData = await getStationData();
      if (stationData) setStations(stationData);
    };

    if (!stations || stations.length < 1) loadStationData();
  }, [stations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.toLowerCase().includes('origin')) {
      setOrigin((prevOrigin) => ({
        ...prevOrigin,
        text: value,
      }));
    } else if (name.toLowerCase().includes('destination')) {
      setDestination((prevDestination) => ({
        ...prevDestination,
        text: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Geocodes user input and returns object with formatted address and coordinates (longitude and latitude)
    const originAddress = await formatAddress(origin.text);
    const destinationAddress = await formatAddress(destination.text);
    // creates array object with coords with mapbox specifications (array[lng,lat])
    const originLngLat = [originAddress.geometry.location.lng, originAddress.geometry.location.lat];
    const destinationLngLat = [
      destinationAddress.geometry.location.lng,
      destinationAddress.geometry.location.lat,
    ];
    // replaces input fields, sets formatted address and coordinates of origin and destination
    setOrigin((prevOrigin) => ({
      ...prevOrigin,
      text: originAddress.formatted_address,
      address: originAddress.formatted_address,
      lnglat: originLngLat,
    }));
    setDestination((prevDestination) => ({
      ...prevDestination,
      text: destinationAddress.formatted_address,
      address: destinationAddress.formatted_address,
      lnglat: destinationLngLat,
    }));

    history.push('/results');
    setIsLoading(false);
    return filterStations(originLngLat, destinationLngLat);
  };

  const getResultStations = (location) => {
    return stations.filter((station) => {
      return (
        Math.abs(station.lat - location[1]) <= RADIUS &&
        Math.abs(station.lon - location[0]) <= RADIUS
      );
    });
  };

  const filterStations = (origin, destination) => {
    const originStations = getResultStations(origin);
    const destinationStations = getResultStations(destination);
    setOrigin((prevOrigin) => ({
      ...prevOrigin,
      stations: originStations,
    }));
    setDestination((prevDestination) => ({
      ...prevDestination,
      stations: destinationStations,
    }));
    setResultStations([...originStations, ...destinationStations]);
  };

  const Main = () => {
    return (
      <main>
        <section className='section-info'>
          <h1>Bike Availability</h1>
          <p>Set your origin and destination to see bike availability.</p>
          <SearchBar
            origin={origin}
            destination={destination}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </section>

        <MapContainer stations={stations} resultStations={resultStations} />

        <Route
          path='/results'
          render={(props) => <Results {...props} origin={origin} destination={destination} />}
        />
      </main>
    );
  };

  return (
    <div className='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default withRouter(App);

// import { knuthShuffle } from 'knuth-shuffle';

// shuffles stationsList https://github.com/Daplie/knuth-shuffle/blob/master/index.js
// const suffledStations = knuthShuffle(stations);
