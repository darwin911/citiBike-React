import React from 'react';
// import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import ReactMapGl from 'react-map-gl';

export const Map = ({ origin, destination }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 40.7359,
    longitud: 73.9911,
    width: '100vw',
    height: '60vh',
    zoom: 7
  });
  const style = {
    height: '50vmin',
    minHeight: '200px',
    width: 'auto'
  };

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}>
      markers
    </ReactMapGl>
  );
};

// componentDidMount() {
//   if ('geolocation' in navigator) {
//     /* geolocation is available */
//     navigator.geolocation.getCurrentPosition(
//       ({ coords: { longitude, latitude } }) =>
//         this.setState({ center: [longitude, latitude] }),
//       error => console.error(error)
//     );
//   } else {
//     /* geolocation IS NOT available */
//     this.setState({ center: [-122.418701, 37.769047] });
//   }
// }

// <Marker coordinates={destination}>
// <img
//   src='https://i.imgur.com/MK4NUzI.png'
//   width='20px'
//   alt='Destination'
// />
// </Marker>
