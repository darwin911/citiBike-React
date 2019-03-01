import React from 'react';

const r = 0.0005

function OriginStations(props) {
  const oLng = props.originLatLng[1];
  const oLat = props.originLatLng[0];
  debugger;
  return (
  <section className="origin-stations">
    <h2>Origin Stations</h2>
      {props.stationList && props.stationList.filter(
        stn => (Math.abs(stn.latitude - oLng) <= r) && Math.abs(stn.longitude - oLat <= r))
          .map(stn => (
            <article className="card" key={stn.id}>
              <h3>{stn.stationName}</h3>
              <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
            </article>
          ))}
  </section>
  )
}

function DestinationStations(props) {
  const dLng = props.destinationLatLng[1]
  const dLat = props.destinationLatLng[0]
  return (
  <section className="destination-stations">
    <h2>Destination Stations</h2>
    {props.stationList && props.stationList.filter(
        stn => (Math.abs(stn.latitude - dLng) <= r) && Math.abs(stn.longitude - dLat <= r))
          .map(stn => (
            <article className="card" key={stn.id}>
              <h3>{stn.stationName}</h3>
              <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
            </article>
          ))}
  </section>
  )
}

export { OriginStations, DestinationStations };
