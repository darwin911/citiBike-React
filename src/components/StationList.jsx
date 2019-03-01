import React from 'react';
import { debug } from 'util';

const r = 0.003

const OriginStations = (props) => {
  // console.log(props.stationList[0].latitude)
  // console.log(props.originLatLng[1])
  // console.log(props.stationList[0].latitude - props.originLatLng[1])
  const oLat = props.originLatLng[1];

  // 40.7393536 -73.98942559999999
  // debugger;
  return (
    <section className="origin-stations">
      <h2>Origin Stations</h2>
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
            <h3>{stn.stationName}</h3>
            <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
          </article>))}
    </section>
  )
}
// 10 E 21st St., New York
// Chelsea Market
const DestinationStations = (props) => {
  const latLng = props.destinationLatLng;
  console.log('lat: ' + latLng[0] + ', long: ' + latLng[1]);
  return (
    <section className="destination-stations">
      <h2>Destination Stations</h2>
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
            <h3>{stn.stationName}</h3>
            <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
          </article>))}
    </section>
  )
}

export { OriginStations, DestinationStations };
