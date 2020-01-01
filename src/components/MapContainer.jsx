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
        ? stations.map(
            ({ availableDocks, id, latitude, longitude, totalDocks }) => {
              const sizeVal = 10 + Math.ceil((availableDocks / maxDocks) * 9);
              return (
                <BikeMarker
                  key={id}
                  latitude={latitude}
                  longitude={longitude}
                  size={sizeVal}
                  availableDocks={availableDocks}
                  totalDocks={totalDocks}
                />
              );
            }
          )
        : resultStations.map(({ availableDocks, id, latitude, longitude }) => {
            const sizeVal = 10 + Math.ceil((availableDocks / maxDocks) * 9);
            return (
              <BikeMarker
                key={id}
                latitude={latitude}
                longitude={longitude}
                size={sizeVal}
              />
            );
          });
    console.log(stationList);
    return (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={15}
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

  const mapStyle = {
    width: '100%',
    height: '45vh',
    margin: '2rem auto',
    overflow: 'hidden',
    boxShadow: '0 0 16px -4px rgba(0, 0, 0, 0.7)'
  };

  return (
    <div style={mapStyle}>
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
