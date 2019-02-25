import React from 'react';
import { withScriptjs,
         withGoogleMap,
         GoogleMap,
         BicyclingLayer,
          Marker }
from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  const location = {
    lat: 40.783874,
    lng: -73.965101
  }
  return (
    <GoogleMap
    defaultZoom={12}
    defaultCenter={location}>
    <Marker position={location} />
    <BicyclingLayer />
  </GoogleMap>
  ) 
 }
))

export default BikeMap;