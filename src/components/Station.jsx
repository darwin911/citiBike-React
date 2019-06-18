import React, { useState } from "react";
import moment from "moment";

const Station = ({ station }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <article
      className="card"
      onMouseEnter={() => setToggle(!toggle)}
      onMouseLeave={() => setToggle(!toggle)}
    >
      <h5>{station.stationName}</h5>
      <p>
        {station.availableBikes} / {station.totalDocks} bikes{" "}
      </p>
      <p style={{ opacity: toggle ? 1 : 0, transition: "500ms" }}>
        Updated: {moment(station.lastCommunicationTime).format("h:mm:ss a")}
      </p>
    </article>
  );
};

export default Station;
