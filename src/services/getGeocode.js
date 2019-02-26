import axios from 'axios';

// const KEY = process.env.REACT_APP_GEOCODE_KEY;
const KEY = process.env.REACT_APP_API_KEY;

const getGeocode = async (origin) => {

  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${origin}&key=${KEY}`
  const resp = await axios(`${URL}`)
  console.log(resp.data.results[0].formatted_address)
  return resp.data.results[0].formatted_address
}

export default getGeocode;