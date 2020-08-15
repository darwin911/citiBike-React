import React from 'react';

const InfoBox = ({ origin, destination }) => {
  return origin ? (
    <section className='infobox'>
      <p className='origin'>{origin}</p>
      <p className='destination'>{destination}</p>
    </section>
  ) : (
    ''
  );
};

export default InfoBox;
