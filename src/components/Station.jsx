import React, { useState } from 'react';
import moment from 'moment';

const Station = ({ station }) => {
  const [details, setDetails] = useState(false);
  return (
    <article
      className='card'
      onMouseEnter={() => setDetails(!details)}
      onMouseLeave={() => setDetails(!details)}>
      <h4>{station.stationName}</h4>
      <p>
        {station.availableBikes} / {station.totalDocks} bikes
      </p>
      <p>Docks Available: {station.availableDocks}</p>
      <p style={{ opacity: details ? 1 : 0, transition: '500ms' }}>
        Updated:{' '}
        {moment(station.lastCommunicationTime, 'h:mm:ss a').format('h:mm:ss a')}
      </p>
    </article>
  );
};

export default Station;
