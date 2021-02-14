import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { memo, useEffect, useState } from 'react';

import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';

// import { maxBy } from 'lodash';
// import { CONSTANTS } from '../constants';
// const { RADIUS } = CONSTANTS;

const WrappedMap = withScriptjs(
  withGoogleMap(({ stations, latitude, longitude }) => {
    const [center, setCenter] = useState({
      latitude: latitude,
      longitude: longitude,
    });

    useEffect(() => {
      // console.log(center);
    }, [center.latitude, center.longitude]);

    // const maxStation = maxBy(stations, (station) => station.num_docks_available);
    // const maxDocks = maxStation ? maxStation.num_docks_available : 0;

    const userAgentCenter = { lat: latitude, lng: longitude };

    function onCenterChanged() {
      setCenter({
        latitude: this.center.lat(),
        longitude: this.center.lng(),
      });
    }

    return (
      <GoogleMap
        onCenterChanged={onCenterChanged}
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={14}
        defaultCenter={userAgentCenter}>
        {stations &&
          stations.map(({ station_id, num_docks_available, ...station }) => {
            return <BikeMarker key={station_id} station={station} />;
          })}
      </GoogleMap>
    );
  })
);

export const MapContainer = memo(({ stations }) => {
  const [navigatorCoords, setNavigatorCoords] = useState({
    latitude: 40.7359,
    longitude: -73.9911,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (coords) {
          setNavigatorCoords(coords);
        }
      },
      (error) => console.error(error)
    );
  }, []);

  const mapStyle = {
    width: '100%',
    height: '55vh',
    margin: '2rem auto',
    overflow: 'hidden',
    boxShadow: '0 0 1.5rem -3px rgb(6, 43, 107)',
    borderRadius: '0.5rem',
  };

  return (
    <div style={mapStyle}>
      <WrappedMap
        latitude={navigatorCoords.latitude}
        longitude={navigatorCoords.longitude}
        stations={stations}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
});
