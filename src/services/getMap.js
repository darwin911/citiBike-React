import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;
const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=${KEY}`

const getMap = async () => {
  const resp  = await axios(`${URL}`);
  // console.log(resp.data)
  return resp.data
} 

export default getMap;