import axios from 'axios';

const URL = 'https://cors.io/?http://feeds.citibikenyc.com/stations/stations.json';

const getStationData = async () => {
  const resp = await axios(`${URL}`);

  console.log(resp.data.stationBeanList);
  return resp.data.stationBeanList
}

export default getStationData;