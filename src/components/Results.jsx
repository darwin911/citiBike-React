import React from 'react';
import InfoBox from './InfoBox';
import StationList from './StationList';

export const Results = ({ origin, destination }) => {
  return (
    <section className='results'>
      <InfoBox origin={origin.address} destination={destination.address} />

      {origin.lnglat[0] && (
        <div className='stations'>
          <StationList type='origin' stations={origin.stations} />
          <StationList type='destination' stations={destination.stations} />
        </div>
      )}
    </section>
  );
};
