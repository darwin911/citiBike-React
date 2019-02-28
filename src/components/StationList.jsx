import React from 'react';

const OriginStations = (props) => {
  return (
  <section className="origin-stations">
    <h2>Origin Stations</h2>
      {props.stationList.filter(
        station => (Math.abs(station.latitude - props.originLatLng.lat) <= 0.001) && Math.abs(station.longitude - props.originLatLng.lng <= 0.001))
          .map(station => (
            <article className="card" key={station.id}>
              <h3>{station.stationName}</h3>
              <p>{station.availableBikes} bikes available</p>
            </article>
          ))}
  </section>
  )
}

const DestinationStations = (props) => {
  return (
  <section className="destination-stations">
    <h2>Destination Stations</h2>{
      props.stationList.filter(
        station => Math.abs(station.latitude - props.destinationLatLng.lat) <= 0.00050)
          .map(station => (
            <article className="card" key={station.id}>
              <h3>{station.stationName}</h3>
              <p>{station.availableBikes} bikes available</p>
            </article>
          ))}
  </section>
  )
}

export { OriginStations, DestinationStations };
