import React from 'react';
import { Marker } from 'react-google-maps';
import blueMarker from '../assets/images/placeholder-svgrepo-com.svg';

export const BikeMarker = ({
  latitude,
  longitude,
  size,
  availableDocks,
  totalDocks
}) => {
  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      label={`${availableDocks}/${totalDocks}`}
      // icon={{
      //   url: blueMarker,
      //   scaledSize: new window.google.maps.Size(size, size)
      // }}
    />
  );
};
