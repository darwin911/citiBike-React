import React, { useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';
// import { maxBy } from 'lodash';
import { CONSTANTS } from '../constants';
const { RADIUS } = CONSTANTS;

const WrappedMap = withScriptjs(
  withGoogleMap(({ stations, resultStations, latitude, longitude }) => {
    const [center, setCenter] = React.useState({ latitude: latitude, longitude: longitude });
    // const [bounds, setBounds] = React.useState(null);

    React.useEffect(() => {
      console.log(center);
    }, [center.latitude, center.longitude]);

    // const maxStation = maxBy(stations, (station) => station.num_docks_available);
    // const maxDocks = maxStation ? maxStation.num_docks_available : 0;

    // TODO Filter out stations closer to center of user location with radius;
    const stationList = stations
      .filter(({ lat, lon, station_status, ...rest }) => {
        return (
          Math.abs(lon - longitude) <= 0.02 &&
          Math.abs(lat - latitude) <= 0.02 &&
          station_status === 'active'
        );
      })
      .map(({ station_id, num_docks_available, ...station }) => {
        return <BikeMarker key={station_id} station={station} />;
      });

    const userAgentCenter = { lat: latitude, lng: longitude };

    function onCenterChanged() {
      setCenter({ latitude: this.center.lat(), longitude: this.center.lng() });
    }

    return (
      <GoogleMap
        onCenterChanged={onCenterChanged}
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={14}
        defaultCenter={userAgentCenter}>
        {resultStations.length > 0
          ? resultStations.map(({ station_id, num_docks_available, ...station }) => {
              return <BikeMarker key={station_id} station={station} />;
            })
          : stationList}
      </GoogleMap>
    );
  })
);

export const MapContainer = ({ stations, resultStations }) => {
  const [navigatorCoords, setNavigatorCoords] = React.useState({
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
        resultStations={resultStations}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};
