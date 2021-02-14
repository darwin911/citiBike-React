import './App.css';

import React, { useEffect, useState } from 'react';

import { CONSTANTS } from './constants';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MapContainer } from './components/MapContainer';
import { Results } from './components/Results';
import { SearchBar } from './components/SearchBar';
import { getStationData } from './services/helper';

const { RADIUS } = CONSTANTS;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultStations, setResultStations] = useState(null);
  const [stations, setStations] = useState(null);
  const [originStations, setOriginStations] = useState(null);
  const [destinationStations, setDestinationStations] = useState(null);

  useEffect(() => {
    const loadStationData = async () => {
      const stationData = await getStationData();
      if (stationData) {
        const activeStations = stationData.filter(
          ({ station_status }) => station_status === 'active'
        );
        setStations(activeStations);
      }
    };

    if (!stations || stations.length < 1) loadStationData();
  }, [stations]);

  const getResultStations = (location) => {
    return stations.filter(
      (station) =>
        Math.abs(station.lat - location[1]) <= RADIUS &&
        Math.abs(station.lon - location[0]) <= RADIUS
    );
  };

  const filterStations = (originLocation, destinationLocation) => {
    const originResults = getResultStations(originLocation);
    const destinationResults = getResultStations(destinationLocation);
    setOriginStations(originResults);
    setDestinationStations(destinationResults);
    const filteredStations = [...originResults, ...destinationResults];
    return filteredStations;
  };

  const Main = () => {
    return (
      <main>
        <section className='section-info'>
          <h1>Bike Availability</h1>
          <p>Set your origin and destination to see bike availability.</p>
          <SearchBar
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setResultStations={setResultStations}
            filterStations={filterStations}
          />
        </section>
        <MapContainer stations={resultStations && resultStations} />
        {resultStations && (
          <Results origin={originStations} destination={destinationStations} />
        )}
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

export default App;

// import { knuthShuffle } from 'knuth-shuffle';

// shuffles stationsList https://github.com/Daplie/knuth-shuffle/blob/master/index.js
// const suffledStations = knuthShuffle(stations);
