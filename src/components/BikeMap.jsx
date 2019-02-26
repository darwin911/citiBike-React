import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, BicyclingLayer, Marker } from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  const originMarker = 
  <Marker title="General Assembly" position={props.origin} />
  const destinationMarker = 
  <Marker title="Central Park" position={props.destination} />
  
  console.log(props)
  return (
    <GoogleMap
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
    isMarkerShown={props.isMarkerShown}>
        {originMarker}
        {destinationMarker}
        <BicyclingLayer />
  </GoogleMap>
  ) 
 }
))

export default BikeMap;