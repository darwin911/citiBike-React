import React from "react";
import InfoBox from "./InfoBox";
import StationList from "./StationList";

const Results = ({ origin, destination }) => {
  return (
    <section className="results">
      <InfoBox origin={origin.address} destination={destination.address} />

      {origin.lnglat[0] && (
        <section className="stations">
          <StationList type="origin" stations={origin.stations} />
          <StationList type="destination" stations={destination.stations} />
        </section>
      )}
    </section>
  );
};

export default Results;
