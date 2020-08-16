import React, { useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { BikeMarker } from './BikeMarker';
import mapStyles from '../ mapStyles';
import { maxBy } from 'lodash';

const WrappedMap = withScriptjs(
  withGoogleMap(({ stations, resultStations, navigatorCoords }) => {
    const maxStation = maxBy(stations, (station) => station.num_docks_available);
    const maxDocks = maxStation ? maxStation.num_docks_available : 0;

    const renderStationList =
      resultStations && resultStations.length > 0 ? resultStations : stations;

    // TODO Filter out stations closer to center of user location with radius;
    const stationList = renderStationList
      .filter((s) => s.station_status === 'active')
      .map(({ station_id, num_docks_available, ...station }) => {
        const sizeVal = 10 + Math.ceil((num_docks_available / maxDocks) * 9);
        return <BikeMarker key={station_id} station={station} size={sizeVal} />;
      });

    let defaultLatitude = 40.7359;
    let defaultLongitude = -73.9911;

    const defaultCenter = { lat: defaultLatitude, lng: defaultLongitude };
    console.log(navigatorCoords);
    return (
      <GoogleMap
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={15}
        defaultCenter={
          navigatorCoords.latitude && navigatorCoords.longitude
            ? { lat: navigatorCoords.latitude, lng: navigatorCoords.longitude }
            : defaultCenter
        }>
        {stationList}
      </GoogleMap>
    );
  })
);

export const MapContainer = ({ stations, resultStations }) => {
  const [navigatorCoords, setNavigatorCoords] = React.useState({ latitude: null, longitude: null });
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
        navigatorCoords={navigatorCoords}
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
