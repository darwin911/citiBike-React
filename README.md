
##### Darwin Smith | Project 2 – Web Development Immersive (WDI)

 **CitiBike Travel Time**
=========================


Citibike Travel Time uses Google Maps at a default location. User may input their location and destination to request directions to and from CitiBike Stations, show distance and directions. Origin and Destination will have Markers on the Map. There will also be an input to locate stations near you.

>[React Google Maps Style Guide](https://tomchentw.github.io/react-google-maps/#introduction)

> [Maps Javascript API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

## Wireframes & Component Hierarchy

[Wireframe](https://github.com/darwin911/citiBike-React/blob/master/src/assets/images/citibike-wireframe.jpg)

[Component Hierarchy](https://github.com/darwin911/citiBike-React/blob/master/src/assets/images/citibike-component-hierarchy.jpg)


#### MVP
- Consume CitiBike and Google Maps API
- Take input from users (Origin and Target) and query API to calculate best route and travel time.
- Render (React Router)
  * Stations
  * Map 
  * Origin
  * Target
  * Directions
  * Travel Time

#### PostMVP

- Allow user to set favorite/home/work Station(s) 
- Add multiple stops

## React Component Hierarchy

#### Components
 - `<App/>`
 - `<Nav/>`
 - `<Map/>`
 - `<Stations/>`
 - `<Result/>`
 - `<FavoriteStation/>`
 - `<StationList/>`

App will hold all state and will be passed down through props to `<Map />, <Stations />, <Nav />` and `<Result />`.

## Additional Libraries

- `axios`
- `react-google-maps`

## Code Snippet

```javascript
const StationList = (props) => {
  return (

  <section className="station-grid">{

    props.stationList

      .filter(station => (
        station.latitude > 40.8100))

        .map(station => (

          <article className="card" key={station.id}>

            <h3>{station.stationName}</h3>
            <p>{station.availableBikes} bikes available</p>
            <code>id: {station.id} </code>
            <code>lat: {station.latitude.toFixed(4)}</code>

          </article>
        )
      )
    }
  </section>
  )
}
```

## Issues and Resolutions

> *