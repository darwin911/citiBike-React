import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, BicyclingLayer, DirectionsRenderer, Marker } from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  const originMarker = 
  <Marker title="General Assembly" position={props.defaultCenter} />
  const destinationMarker = 
  <Marker title="Central Park" position={props.destination} />
  let testMe;

  const DirectionsService = new window.google.maps.DirectionsService();
  const route = DirectionsService.route({
    origin: 'Times Square',
    destination: '30 W 18th St., New York',
    travelMode: 'BICYCLING'
  }, (result, status) => {
    if (status === window.google.maps.DirectionsStatus.OK) {
      console.log(result.routes[0]);
      testMe = result.routes[0]
    } else {
      console.error(`error fetching directions ${result}`)
    }
  })

  return (
    <GoogleMap
      onChange={props.handleChange}
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
      isMarkerShown={props.isMarkerShown}>
          {originMarker}
          {/* {destinationMarker} */}
          {/* <BicyclingLayer /> */}
          <DirectionsRenderer directions={testMe} />
    </GoogleMap>

  ) 
 }
))

export default BikeMap;