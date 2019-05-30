import React from "react";

const InfoBox = ({ origin, destination }) => {
  return origin ? (
    <section className="infobox">
      <p className="origin">From: {origin}</p>
      <p className="destination">To: {destination}</p>
    </section>
  ) : (
    ""
  );
};

export default InfoBox;
