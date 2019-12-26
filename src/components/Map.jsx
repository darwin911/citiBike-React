import React, { useState, useEffect, PureComponent } from 'react';
import ReactMapGl from 'react-map-gl';
import { BikeMarker } from './BikeMarker';

class Markers extends PureComponent {
  render() {
    const { data } = this.props;
    return data.map(station => (
      <BikeMarker
        key={station.id}
        latitude={station.latitude}
        longitude={station.longitude}
      />
    ));
  }
}

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
    zoom: 11
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords);
        // setViewport(prevState => ({
        //   ...prevState,
        //   latitude: coords.latitude,
        //   longitude: coords.longitude
        // }));
      },
      error => console.error(error)
    );
  }, []);

  const originAndDestinationStations = (
    <>
      <BikeMarker latitude={origin[1]} longitude={origin[0]} />
      <BikeMarker latitude={destination[1]} longitude={destination[0]} />
    </>
  );

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={'mapbox://styles/darwin911/ck4ggb5z611bl1ctklfx428u0'}
      zoom={isOriginSet ? 13 : viewport.zoom}
      onViewportChange={viewport => setViewport(viewport)}>
      {!isOriginSet && !isDestinationSet ? (
        <Markers data={stations} />
      ) : (
        originAndDestinationStations
      )}
    </ReactMapGl>
  );
};
