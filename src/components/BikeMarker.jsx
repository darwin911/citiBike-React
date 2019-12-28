import React from 'react';
import { Marker } from 'react-google-maps';
import blueMarker from '../assets/images/placeholder-svgrepo-com.svg';

export const BikeMarker = ({ latitude, longitude, size }) => {
  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      icon={{
        url: blueMarker,
        scaledSize: new window.google.maps.Size(size, size)
      }}
    />
  );
};
