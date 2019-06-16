import React from "react";

const StationList = ({
  stationList,
  lngLat,
  moreDetails,
  toggleDetails,
  type,
  radius
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
              Math.abs(stn.latitude - lngLat[1]) <= radius &&
              Math.abs(stn.longitude - lngLat[0]) <= radius
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
