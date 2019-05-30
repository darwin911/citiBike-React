import axios from "axios";

// const KEY = process.env.REACT_APP_GEOCODE_KEY;
const KEY = process.env.REACT_APP_API_KEY;

const formatAddress = async location => {
  const resp = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${KEY}`
  );
  return resp.data.results[0];
};

export { formatAddress };
