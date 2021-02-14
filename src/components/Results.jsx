import InfoBox from './InfoBox';
import React from 'react';
import StationList from './StationList';

export const Results = ({ origin, destination }) => {
  return (
    <section className='results'>
      <InfoBox origin={origin.address} destination={destination.address} />

      <div className='stations'>
        {origin && <StationList type='origin' stations={origin} />}
        {destination && (
          <StationList type='destination' stations={destination} />
        )}
      </div>
    </section>
  );
};
