import React from "react";

const StationList = ({ stationList, moreDetails, toggleDetails, type }) => {
  return (
    <section
      className={type === "origin" ? "origin-stations" : "destination-stations"}
    >
      <h3>{type === "origin" ? "Origin" : "Destination"} Stations</h3>
      {stationList &&
        stationList.map(stn => {
          return (
            <article className="card" key={stn.id}>
              <h5>{stn.stationName}</h5>
              <p>
                {stn.availableBikes} / {stn.totalDocks} bikes{" "}
              </p>
              <input
                id={stn.id}
                type="checkbox"
                name="more-details"
                onChange={e => toggleDetails(e)}
                value={moreDetails}
              />
            </article>
          );
        })}
    </section>
  );
};

export default StationList;
