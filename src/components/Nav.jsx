import React from 'react'

const Nav = (props) => {
  return (
    <nav>
      <form onSubmit={props.onSubmit}>

        <input 
            className="origin-input"
            type="text"
            placeholder="Origin"
            name="origin"
            onChange={props.handleChange}
            value={props.origin} required/>

        <input 
            className="destination-input"
            type="text"
            placeholder="Destination"
            name="destination"
            onChange={props.handleChange}
            value={props.destination} required/>

        <input 
          className="submit"
          type="submit"
          value="Find Stations" />

      </form>
      
    </nav>
  )
}

export default Nav;