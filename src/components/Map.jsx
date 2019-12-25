import React, { useState, useEffect } from 'react';
import ReactMapGl from 'react-map-gl';
import { BikeMarker } from './BikeMarker';

export const Map = ({
  origin,
  destination,
  stations,
  isOriginSet,
  isDestinationSet
}) => {
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

  const allStationMarkers = stations.map(station => (
    <BikeMarker
      key={station.id}
      latitude={station.latitude}
      longitude={station.longitude}
    />
  ));

  const originAndDestinationStations = (
    <>
      <BikeMarker latitude={origin[1]} longitude={origin[0]} />
      <BikeMarker latitude={destination[1]} longitude={destination[0]} />
    </>
  );

  console.log(origin, destination, isOriginSet, isDestinationSet);
  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={'mapbox://styles/darwin911/ck4ggb5z611bl1ctklfx428u0'}
      zoom={isOriginSet ? 13 : viewport.zoom}
      onViewportChange={viewport => setViewport(viewport)}>
      {!isOriginSet && !isDestinationSet
        ? allStationMarkers
        : originAndDestinationStations}
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
//     /* geolocation IS NOT available */;
//   }
// }
