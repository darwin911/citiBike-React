import React from "react";

const InfoBox = props => {
  return props.origin ? (
    <section className="infobox">
      <p className="origin">From: {props.origin}</p>
      <p className="destination">To: {props.destination}</p>
    </section>
  ) : (
    ""
  );
};

export default InfoBox;
