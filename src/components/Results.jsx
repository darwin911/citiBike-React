import React from "react";
import InfoBox from "./InfoBox";
import { OriginStations, DestinationStations } from "./StationList";

const Results = ({
  origin,
  destination,
  originLatLng,
  destinationLatLng,
  stationList
}) => {
  return (
    <section className="results">
      <InfoBox origin={origin} destination={destination} />

      {originLatLng && (
        <section className="stations">
          <OriginStations
            originLatLng={originLatLng}
            stationList={stationList}
          />
          <DestinationStations
            destinationLatLng={destinationLatLng}
            stationList={stationList}
          />
        </section>
      )}
    </section>
  );
};

export default Results;
