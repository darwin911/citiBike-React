import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, BicyclingLayer, DirectionsRenderer, Marker } from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  const originMarker = 
  <Marker
    title="Origin"
    position={
      (props.originLatLng) ? props.origin : props.defaultCenter
    } />

  let route;

  const DirectionsService = new window.google.maps.DirectionsService();
  
  DirectionsService.route({
      origin: 'Times Square',
      destination: '30 W 18th St., New York',
      travelMode: 'BICYCLING'
    }, (result, status) => {
      (status === window.google.maps.DirectionsStatus.OK)
      ? route = result.routes[0]
      : console.error(`error fetching directions ${result}`)
    })

  const defaultMap = 
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
      isMarkerShown={props.isMarkerShown}
    >
      {originMarker}
      <BicyclingLayer />
      <DirectionsRenderer directions={route} />
    </GoogleMap>


  const testMap = 
  <GoogleMap
    center={props.origin}
    zoom={13}
    isMarkerShown={true}
  >
    <Marker
      title="Origin"
      position={props.origin} />
    {/* <BicyclingLayer /> */}
    <DirectionsRenderer directions={route} />
  </GoogleMap>
    
  // const destinationMarker = 
  // <Marker title="Central Park" position={props.destination} />


  return (
    <span>
      {(props.origin) ? testMap : defaultMap}
    </span>
  ) 
 }
))

export default BikeMap;