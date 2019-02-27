import React from 'react';

const OriginStations = (props) => {
  return (
  <section className="station-grid">
    <h2>Origin Destinations</h2>
      {props.stationList.filter(
        station => (Math.abs(station.latitude - props.originLatLng.lat) <= 0.00050) && Math.abs(station.longitude - props.originLatLng.lng <= 0.00050))
          .map(station => (
            <article className="card" key={station.id}>
              <h3>{station.stationName}</h3>
              <p>{station.availableBikes} bikes available</p>
              <code>id: {station.id} </code><br />
              <code>lat: {station.latitude.toFixed(4)}</code><br />
              <code>lng: {station.longitude.toFixed(4)}</code>
            </article>
          ))}
  </section>
  )
}

const DestinationStations = (props) => {
  return (
  <section className="station-grid">
    <h2>Destination Stations</h2>{
      props.stationList.filter(
        station => Math.abs(station.latitude - props.destinationLatLng.lat) <= 0.00050)
          .map(station => (
            <article className="card" key={station.id}>
              <h3>{station.stationName}</h3>
              <p>{station.availableBikes} bikes available</p>
              <code>id: {station.id} </code><br />
              <code>lat: {station.latitude.toFixed(4)}</code><br />
              <code>lng: {station.longitude.toFixed(4)}</code>
            </article>
          ))}
  </section>
  )
}

export { OriginStations, DestinationStations };
