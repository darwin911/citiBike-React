import React from 'react';

const InfoBox = (props) => {
  // console.log(props)
  return (
    <section>
      {props.origin && (
        <div className="infobox">
          <aside className="origin">
            <h4>From: {props.origin}</h4>
          </aside>
          <aside className="destination">
            <h4>To: {props.destination}</h4>
          </aside>
        </div>
          )
        }
    </section>
  )
}

export default InfoBox;