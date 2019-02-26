import React from 'react';

const StationList = (props) => {
  const first20 = props.stationList.slice(0, 20)
  
  return (
  <section className="station-grid">{first20.map(station => (

          <article className="card" key={station.id}>
            <h3>{station.stationName}</h3>
            <p>{station.availableBikes} bikes available</p>
            <code>id: {station.id} </code>
            <code>lat: {station.latitude.toFixed(4)}</code>
          </article>

        ))}
  </section>
  )
}

export default StationList;
