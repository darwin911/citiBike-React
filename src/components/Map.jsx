import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';

export const Map = ({ origin, destination, stations }) => {
  const [viewport, setViewport] = useState({
    latitude: 40.7359,
    longitude: -73.9911,
    width: '100%',
    height: '70vh',
    maxWidth: '100%',
    zoom: 11.5
  });

  useEffect(() => {
    console.log('useEffect: Map');
  }, []);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={'mapbox://styles/darwin911/ck4ggb5z611bl1ctklfx428u0'}
      onViewportChange={viewport => setViewport(viewport)}>
      {stations.map(station => (
        <Marker
          key={station.id}
          latitude={station.latitude}
          longitude={station.longitude}>
          <button className='bike-icon' />
        </Marker>
      ))}
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
