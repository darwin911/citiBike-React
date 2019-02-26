import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;
let tempURL =`https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=initMap`
const URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}`

const getDirections = async () => {
  const resp  = await axios(`${URL}`);
  console.log(resp.data)
  return resp.data
} 

const initMap = () => {
  const directionsService = new window.google.maps.DirectionsService;
  const directionsDisplay = new window.google.maps.DirectionsRenderer;
  
  const map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });

  directionsDisplay.setMap(map);

  const onChangeHandler = () => {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
  directionsService.route({
    origin: '76 thayer St., New York, NY',
    destination: '30 W 18th St., New York, NY',
    travelMode: 'BICYCLING'
  }, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

export default getDirections;