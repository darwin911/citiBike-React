import React from 'react';

const StationList = (props) => {
  return (
  <section className="station-grid">{
    props.stationList
      .filter(station => (station.latitude > 40.8100))
        .map(station => (
          <article 
            className="card"
            key={station.id}>
            <h3>{station.stationName}</h3>
            <p>{station.availableBikes} bikes available</p>
            <code>id: {station.id} </code>
            <code>lat: {station.latitude.toFixed(4)}</code>
          </article>
        ))}
  </section>
  )
}

export default StationList;
