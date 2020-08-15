import React, { useState } from 'react';
import moment from 'moment';

const Station = ({ station }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <article
      className='card'
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}>
      <h4>{station.name}</h4>
      <p>{station.num_bikes_available} bikes available</p>
      <p>{station.num_docks_available} docks available</p>
      <p>{station.num_bikes_disabled} disabled bikes</p>
      <p style={{ opacity: showDetails ? 1 : 0, transition: '250ms' }}>
        Updated: {moment(station.last_reported).format('h:mm:ss a')}
      </p>
    </article>
  );
};

export default Station;
