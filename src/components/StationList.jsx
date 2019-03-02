import React from 'react';

const r = 0.003

const OriginStations = (props) => {

  return (
    <section className="origin-stations">
      <h3>Origin Stations</h3>
      {props.stationList && props.stationList
        .filter(
          stn => (
            Math.abs(
              stn.latitude - props.originLatLng[1]
            ) <= r
          )
        )
        .filter(
          stn => (
            Math.abs(
              stn.longitude - props.originLatLng[0]
            ) <= r
          )
        )
        .map(stn => (
          <article className="card" key={stn.id}>
            <h5>{stn.stationName}</h5>
            <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
          </article>))}
    </section>
  )
}

const DestinationStations = (props) => {
  return (
    <section className="destination-stations">
      <h3>Destination Stations</h3>
      {props.stationList && props.stationList
        .filter(
          stn => (
            Math.abs(
              stn.latitude - props.destinationLatLng[1]
            ) <= r
          )
        )
        .filter(
          stn => (
            Math.abs(
              stn.longitude - props.destinationLatLng[0]
            ) <= r
          )
        )
        .map(stn => (
          <article className="card" key={stn.id}>
            <h5>{stn.stationName}</h5>
            <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
          </article>))}
    </section>
  )
}

export { OriginStations, DestinationStations };
