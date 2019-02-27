import React, { Component } from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

class Directions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null
    }
  }
  
  render() {
    console.log(window)
  //  const DirectionsService = new window.google.maps.DirectionsService();
  //     DirectionsService.route(
  //       {
  //         origin: new window.google.maps.LatLng(-1.4519517, -48.468732),
  //         destination: new window.google.maps.LatLng(-1.4743965, -48.4554105),
  //         waypoints: [
  //           { location: new window.google.maps.LatLng(-1.3762847, -48.4239654) }
  //         ],
  //         travelMode: "DRIVING",
  //         provideRouteAlternatives: true,
  //         optimizeWaypoints: true
  //       }, (response, status) => {
  //         if (status === "OK") {
  //           const coords = response.routes[0].overview_path;
  //          // save the path to state
  //           this.setState({ coords });
  //         } else {
  //           window.alert("Directions request failed due to " + status);
  //         }
  //       }
  //     )

    return (
      <div>Hot pants</div>
    )
  }
}
export default withScriptjs(withGoogleMap((props)))(Directions)
