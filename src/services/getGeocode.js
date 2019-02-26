import axios from 'axios';

const KEY = process.env.REACT_APP_GEOCODE_KEY;

const getGeocode = async (origin) => {
  const URL = `https://api.geocod.io/v1.3/geocode?q=${origin}&api_key=${KEY}`
  const resp = await axios(`${URL}`)
  return resp.data.results[0].location
}

export default getGeocode;