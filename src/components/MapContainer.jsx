import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';
import { maxBy } from 'lodash';

const WrappedMap = withScriptjs(
  withGoogleMap(({ stations, resultStations }) => {
    const maxAvailableStation = maxBy(
      stations,
      station => station.availableBikes
    );
    console.log(resultStations);
    const stationList =
      resultStations.length <= 0
        ? stations.map(station => {
            const availableBikes = station.availableBikes;
            const sizeVal =
              12 +
              Math.ceil(
                (availableBikes / maxAvailableStation.availableBikes) * 8
              );
            return (
              <BikeMarker
                key={station.id}
                latitude={station.latitude}
                longitude={station.longitude}
                size={sizeVal}
              />
            );
          })
        : resultStations.map(station => (
            <BikeMarker
              key={station.id}
              latitude={station.latitude}
              longitude={station.longitude}
              size={20}
            />
          ));

    const googleMap = (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={13}
        defaultCenter={{ lat: 40.7359, lng: -73.9911 }}>
        {stationList}
      </GoogleMap>
    );

    return googleMap;
  })
);

export const MapContainer = ({
  origin,
  destination,
  stations,
  isOriginSet,
  isDestinationSet,
  resultStations
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

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <WrappedMap
        stations={stations}
        resultStations={resultStations}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};
