import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, BicyclingLayer,  Marker, DirectionsRenderer } from 'react-google-maps';

const BikeMap = withScriptjs(withGoogleMap((props) => {
  const originMarker =
    <Marker
      title="Origin"
      position={
        (props.originLatLng) ? props.origin : props.defaultCenter
      } />

  const defaultMap =
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
      isMarkerShown={props.isMarkerShown}>
      {originMarker}
      <BicyclingLayer />
    </GoogleMap>

  const map =
    <GoogleMap
      center={props.origin}
      zoom={12}
      isMarkerShown={true}>

      <Marker
        title="Origin"
        position={props.origin} />
      <Marker
        title="Destination"
        position={props.destination} />
      <BicyclingLayer />
      {/* <DirectionsRenderer directions={} /> */}

    </GoogleMap>


  // const DirectionsService = new window.google.maps.DirectionsService();
  // DirectionsService.route(
  //   {origin: new window.google.maps.LatLng(-1.4519517, -48.468732),
  //     destination: new window.google.maps.LatLng(-1.4743965, -48.4554105),
  //     waypoints: [
  //       { location: new window.google.maps.LatLng(-1.3762847, -48.4239654) }
  //     ],
  //     travelMode: "DRIVING",
  //     provideRouteAlternatives: true,
  //     optimizeWaypoints: true
  //   }, (response, status) => {
  //     if (status === "OK") {
  //       const coords = response.routes[0].overview_path;
  //     // save the path to state
  //       // self.setState({ coords });
  //     } else {
  //       window.alert("Directions request failed due to " + status);
  //     }
  //   }
  // )

  return (
    <span>
      {(props.origin) ? map : defaultMap}
    </span>
  )
}
))

export default BikeMap;