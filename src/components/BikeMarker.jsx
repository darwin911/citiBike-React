import React from 'react';
import { Marker } from 'react-map-gl';

export const BikeMarker = ({ latitude, longitude }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <button className='bike-icon' />
    </Marker>
  );
};
