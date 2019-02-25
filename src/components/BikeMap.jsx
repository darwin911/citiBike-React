import React from 'react';
import { withScriptjs,
         withGoogleMap,
         GoogleMap,
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
  </GoogleMap>
  ) 
 }
))

export default BikeMap;