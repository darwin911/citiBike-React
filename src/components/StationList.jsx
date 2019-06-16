import React from "react";

// distance (radius) which the components will filter the lat and lng of stations compared to the user's input in lat lng
const r = 0.00375;

const StationList = ({
  stationList,
  lngLat,
  moreDetails,
  toggleDetails,
  type
}) => {
  return (
    <section
      className={type === "origin" ? "origin-stations" : "destination-stations"}
    >
      <h3>{type === "origin" ? "Origin" : "Destination"} Stations</h3>
      {stationList &&
        stationList
          .filter(
            stn =>
              Math.abs(stn.latitude - lngLat[1]) <= r &&
              Math.abs(stn.longitude - lngLat[0]) <= r
          )
          .map(stn => {
            return (
              <article className="card" key={stn.id}>
                <h5>{stn.stationName}</h5>
                <p>
                  {stn.availableBikes} / {stn.totalDocks} bikes{" "}
                </p>
                <input
                  type="checkbox"
                  name="more-details"
                  onChange={toggleDetails}
                  value={moreDetails}
                />
              </article>
            );
          })}
    </section>
  );
};

export default StationList;
