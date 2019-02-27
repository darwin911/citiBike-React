import React from 'react';

const StationList = (props) => {
  console.log(props.defaultCenter.lat)
  console.log(props.stationList.filter(station => Math.abs(station.latitude - props.defaultCenter.lat) <= 0.00050))
  // console.log(props.stationList.filter(station => Math.abs(station.latitude - this.props.originLatLng.lat) <= 0.0006 ))
  return (
  <section className="station-grid">{props.stationList.filter(station => Math.abs(station.latitude - props.defaultCenter.lat) <= 0.00050)
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
