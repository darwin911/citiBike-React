
##### Darwin Smith | Project 2 – Web Development Immersive (WDI)

 **CitiBike Stations**
=========================


[Citibike Stations](https://citibike-react.netlify.com/) helps you find the nearest CitiBike stations nearest to where you are and your destination. Origin and Destination will have Markers on the Map. Find Stations will location the nearest stations.

>[Mapbox Docs](https://docs.mapbox.com/mapbox-gl-js/api/)

>[Mapbox React GL](https://github.com/alex3165/react-mapbox-gl)

>[React Google Maps Style Guide](https://tomchentw.github.io/react-google-maps/#introduction)


> [Maps Javascript API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

## Wireframes & Component Hierarchy

[Wireframe](https://github.com/darwin911/citiBike-React/blob/master/src/assets/images/citibike-wireframe.jpg)

[Component Hierarchy](https://github.com/darwin911/citiBike-React/blob/master/src/assets/images/citibike-component-hierarchy.jpg)

## User Stories

User should expect to be able to type in a specific address (Building Number, Street, City, State), zipcode, neighborhood, or relevant location, and obtain a list of the nearest bike stations to said location, as well as their destination.

#### MVP
- Consume CitiBike and Google Maps API
- Take input from users (Origin and Target) to find nearest stations.
- Render
  * Map (with Markers)
  * Stations
  * Origin
  * Destination
  * Target
  * CitiBike Stations Nearest to Origin Location
  * CitiBike Stations Nearest to Destination Location

#### PostMVP

- Allow user to set favorite/home/work Station(s) 
- Add multiple stops
- Display directions route on map
- Calculate estimated travel time

## React Component Hierarchy

#### Components
 - `<App/>`
 - `<Nav/>`
 - `<Map/>`
 - `<Stations/>`
 - `<Result/>`
 - `<Infobox />`
 - `<StationList/>`

App will hold all state and will be passed down through props to `<Map />, <Stations />, <Nav />` and `<Result />`.

## Additional Libraries

- `axios`
- `react-router-dom`
- `mapbox-gl`
- `react-mapbox-gl`

## Code Snippet

This code snippet filters stations that have a difference (r) in their locations (Latitude and Longitude).

```javascript
return (
    <section className="origin-stations">
      <h2>Origin Stations</h2>
      {props.stationList && props.stationList
        .filter(
          stn => (
            Math.abs(
              stn.latitude - props.originLatLng[1]
            ) <= r
          )
        )
        .filter(
          stn => (
            Math.abs(
              stn.longitude - props.originLatLng[0]
            ) <= r
          )
        )
        .map(stn => (
          <article className="card" key={stn.id}>
            <h3>{stn.stationName}</h3>
            <p>{stn.availableBikes} / {stn.totalDocks} bikes </p>
          </article>))}
    </section>
  )
```

## Issues and Resolutions

* Issue: Mapbox map would re-render after any input inside of Origin Input or Destination Input. 

- Resolution: Manipulate and change required state inside of Nav component and pass values to handleSubmit function in order to update state in App required for Origin/Destination location. 

- Issue: Was not able to use Google Maps API directions service given documentation was written for Javascript, not React projects; and, `react-google-maps` which is a wrapper for Google Maps, was limited in documention and code snippets were written with `recompose.

- Resolution: Mapbox. Better documentation and easier to incorporate into my project.