import React from 'react';
import BikeMap from './BikeMap';

const Main = (props) => {
      const KEY = process.env.REACT_APP_API_KEY
  return (
    <main>
      <BikeMap
        center={props.center}
        isMarkerShown={props.isMarkerShown}
        googleMapURL={
          `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`
        } loadingElement={
          <div className="loading-element"/>
        } containerElement={
          <div className="container-element"/>
        } mapElement={
          <div className="map-element" />
        }
      />
    </main>
  )
}

export default Main;