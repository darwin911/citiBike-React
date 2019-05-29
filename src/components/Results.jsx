import React from "react";
import InfoBox from "./InfoBox";
import { OriginStations, DestinationStations } from "./StationList";

const Results = props => {
  return (
    <section className="results">
      <InfoBox origin={props.origin} destination={props.destination} />

      {props.originLatLng && (
        <section className="stations">
          <OriginStations
            originLatLng={props.originLatLng}
            stationList={props.stationList}
          />
          <DestinationStations
            destinationLatLng={props.destinationLatLng}
            stationList={props.stationList}
          />
        </section>
      )}
    </section>
  );
};

export default Results;
