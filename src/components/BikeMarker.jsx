import React from 'react';
import { Marker } from 'react-google-maps';
// import bikeIcon from '../assets/images/bike.png';

export const BikeMarker = ({ latitude, longitude }) => {
  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      // icon={{
      //   url: bikeIcon,
      //   scaledSize: new window.google.maps.Size(24, 24)
      // }}
    />
  );
};
