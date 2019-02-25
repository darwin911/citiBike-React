import React from 'react';
import { withScriptjs,
         withGoogleMap,
         GoogleMap,
          Marker }
from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
    defaultZoom={12}
    defaultCenter={{ 
      lat: 40.783874,
      lng: -73.965101
    }}>
    {/* <Marker position={{lat: 40.783874,
          lng: -73.965101}} /> */}
    {props.isMarketShown && <Marker
        position={{
          lat: 40.783874,
          lng: -73.965101 }}/>}
  </GoogleMap>
  ) 
 }
))

export default BikeMap;