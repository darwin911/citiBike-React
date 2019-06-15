import React from "react";
// distance (radius) which the components will filter the lat and lng of stations compared to the user's input in lat lng
const r = 0.00375;

const OriginStations = ({ stationList, originLngLat }) => {
  return (
    <section className="origin-stations">
      <h3>Origin Stations</h3>
      {stationList &&
        stationList
          .filter(
            stn =>
              Math.abs(stn.latitude - originLngLat[1]) <= r &&
              Math.abs(stn.longitude - originLngLat[0]) <= r
          )
          .map(stn => {
            return (
              <article className="card" key={stn.id}>
                <h5>{stn.stationName}</h5>
                <p>
                  {stn.availableBikes} / {stn.totalDocks} bikes{" "}
                </p>
              </article>
            );
          })}
    </section>
  );
};

const DestinationStations = ({ stationList, destinationLngLat }) => {
  return (
    <section className="destination-stations">
      <h3>Destination Stations</h3>
      {stationList &&
        stationList
          .filter(
            stn =>
              Math.abs(stn.latitude - destinationLngLat[1]) <= r &&
              Math.abs(stn.longitude - destinationLngLat[0]) <= r
          )
          .map(stn => (
            <article className="card" key={stn.id}>
              <h5>{stn.stationName}</h5>
              <p>
                {stn.availableBikes} / {stn.totalDocks} bikes{" "}
              </p>
            </article>
          ))}
    </section>
  );
};

export { OriginStations, DestinationStations };
