import React from "react";
import InfoBox from "./InfoBox";
import { OriginStations, DestinationStations } from "./StationList";

const Results = ({ origin, destination, stationList }) => {
  return (
    <section className="results">
      <InfoBox origin={origin.address} destination={destination.address} />

      {origin.lnglat && (
        <section className="stations">
          <OriginStations
            originLngLat={origin.lnglat}
            stationList={stationList}
          />
          <DestinationStations
            destinationLngLat={destination.lnglat}
            stationList={stationList}
          />
        </section>
      )}
    </section>
  );
};

export default Results;
