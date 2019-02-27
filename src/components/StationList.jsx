import React from 'react';

const StationList = (props) => {

  return (
  <section className="station-grid">{
    props.stationList.filter(
      station => Math.abs(station.latitude - props.originLatLng.lat) <= 0.00050)
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

export default StationList;
