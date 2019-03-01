import React from 'react';

const InfoBox = (props) => {

  return (
    <section className="infobox">
      {props.origin && (
          <aside >
            <h4 className="origin">From: {props.origin}</h4>
            <h4 className="destination">To: {props.destination}</h4>
          </aside>
          )
        }
    </section>
  )
}

export default InfoBox;