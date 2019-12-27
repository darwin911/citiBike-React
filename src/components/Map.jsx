import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';

const Markers = data => {
  return data.map(station => (
    <BikeMarker
      key={station.id}
      latitude={station.latitude}
      longitude={station.longitude}
      availableBikes={station.availableBikes}
    />
  ));
};

const WrappedMap = withScriptjs(
  withGoogleMap(({ data }) => {
    return (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={11}
        defaultCenter={{ lat: 40.7359, lng: -73.9911 }}>
        {data.map(station => (
          <BikeMarker
            key={station.id}
            latitude={station.latitude}
            longitude={station.longitude}
          />
        ))}
      </GoogleMap>
    );
  })
);

export const Map = ({
  origin,
  destination,
  stations,
  isOriginSet,
  isDestinationSet
}) => {
  const [center, setCenter] = useState({
    latitude: 40.7359,
    longitude: -73.9911
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords);
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
    <div style={{ width: '100%', height: '50vh' }}>
      <WrappedMap
        data={stations}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};
