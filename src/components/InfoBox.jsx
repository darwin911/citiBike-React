import React from 'react';

const InfoBox = (props) => {
  // debugger;
  return (
    (props.origin)
      ?
      <section className="infobox">
        <p className="origin">From: {props.origin}</p>
        <p className="destination">To: {props.destination}</p>
      </section>
      :
      <div></div>
  )
}

export default InfoBox;