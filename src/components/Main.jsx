import React from 'react';
import BikeMap from './BikeMap';

const Main = (props) => {
    const KEY = process.env.REACT_APP_API_KEY
    // console.log(props.state)
  return (
    <main className="map">
      <BikeMap
        origin={props.state.originLatLng}
        destination={props.state.destinationLatLng}
        mapTypeId={props.state.mapTypeId}
        defaultCenter={props.state.defaultCenter}
        defaultZoom={props.state.defaultZoom}
        isMarkerShown={props.state.isMarkerShown}
        googleMapURL={
          `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&li braries=geometry,drawing,places`
        }
         loadingElement={<div className="loading-element"/>
        } containerElement={<div className="container-element"/>
        } mapElement={<div className="map-element" />
        }
      />
    </main>
  )
}

export default Main;