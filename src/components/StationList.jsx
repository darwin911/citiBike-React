import React from "react";
import Station from "./Station";

const StationList = ({ stationList, type }) => {
  return (
    <section
      className={type === "origin" ? "origin-stations" : "destination-stations"}
    >
      <h3>{type === "origin" ? "Origin" : "Destination"} Stations</h3>
      {stationList &&
        stationList.map(station => (
          <Station key={station.id} station={station} />
        ))}
    </section>
  );
};

export default StationList;
