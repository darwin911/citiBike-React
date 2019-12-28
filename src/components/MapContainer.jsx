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

    const stationList = resultStations
      ? stations.map(station => {
          const availableBikes = station.availableBikes;
          const sizeVal =
            16 +
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

    // citibike stations indicating number of available bikes, and each station has a different number of total bikes, so I also have the number of available bike. These stations show up as markers that I’d like to show in different sizes, the difference calculated in a range between 8px the smallest, and 24px the biggest, taking into account the number of available bikes

    const handleZoomChanged = zoom => {
      console.log('handleBoundChanged\n', zoom, new Date(Date.now()));
      // setCurrentZoom();
    };

    const googleMap = (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={14}
        defaultCenter={{ lat: 40.7359, lng: -73.9911 }}
        onZoomChanged={handleZoomChanged}>
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
