import React from 'react';
import Station from './Station';

const StationList = ({ stations, type }) => {
  return (
    <section className={type === 'origin' ? 'origin-stations' : 'destination-stations'}>
      <h3>{type === 'origin' ? 'Origin' : 'Destination'} Stations</h3>
      {stations &&
        stations
          .filter((s) => s)
          .map((station) => <Station key={station.station_id} station={station} />)}
    </section>
  );
};

export default StationList;
