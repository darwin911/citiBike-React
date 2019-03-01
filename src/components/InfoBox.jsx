import React from 'react';

const InfoBox = (props) => {
  // debugger;
  return (
    (props.origin)
      ?
      <section className="infobox">
        <h4 className="origin">From: {props.origin}</h4>
        <h4 className="destination">To: {props.destination}</h4>
      </section>
      :
      <div></div>
  )
}

export default InfoBox;