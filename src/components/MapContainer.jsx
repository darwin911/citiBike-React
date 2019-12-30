import React, { useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';
import { maxBy } from 'lodash';

const WrappedMap = withScriptjs(
  withGoogleMap(({ stations, resultStations }) => {
    const maxStation = maxBy(stations, station => station.availableDocks);

    const maxDocks = maxStation ? maxStation.availableDocks : 0;

    const stationList =
      resultStations.length <= 0
        ? stations.map(({ availableDocks, id, latitude, longitude }) => {
            const sizeVal = 30 + Math.ceil((availableDocks / maxDocks) * 30);
            return (
              <BikeMarker
                key={id}
                latitude={latitude}
                longitude={longitude}
                size={sizeVal}
              />
            );
          })
        : resultStations.map(({ availableDocks, id, latitude, longitude }) => {
            const sizeVal = 12 + Math.ceil((availableDocks / maxDocks) * 12);
            return (
              <BikeMarker
                key={id}
                latitude={latitude}
                longitude={longitude}
                size={sizeVal}
              />
            );
          });
    return (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={14}
        defaultCenter={{ lat: 40.7359, lng: -73.9911 }}>
        {stationList}
      </GoogleMap>
    );
  })
);

export const MapContainer = ({ stations, resultStations }) => {
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
