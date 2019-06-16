import React from "react";
import InfoBox from "./InfoBox";
import StationList from "./StationList";

const Results = ({
  origin,
  destination,
  stationList,
  moreDetails,
  toggleDetails,
  radius
}) => {
  return (
    <section className="results">
      <InfoBox origin={origin.address} destination={destination.address} />

      {origin.lnglat && (
        <section className="stations">
          <StationList
            type="origin"
            moreDetails={moreDetails}
            toggleDetails={toggleDetails}
            lngLat={origin.lnglat}
            stationList={stationList}
            radius={radius}
          />
          <StationList
            type="destination"
            moreDetails={moreDetails}
            toggleDetails={toggleDetails}
            lngLat={destination.lnglat}
            stationList={stationList}
            radius={radius}
          />
        </section>
      )}
    </section>
  );
};

export default Results;
