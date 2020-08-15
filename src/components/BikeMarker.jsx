import React from 'react';
import { Marker } from 'react-google-maps';
// import blueMarker from '../assets/images/placeholder-svgrepo-com.svg';

export const BikeMarker = ({ station: { lat, lon, num_bikes_available, capacity } }) => {
  return <Marker position={{ lat, lng: lon }} label={`${num_bikes_available} / ${capacity}`} />;
};
