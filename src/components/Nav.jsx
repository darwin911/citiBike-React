import React from 'react'

const Nav = (props) => {
  return (
    <nav>
      <form onSubmit={props.onSubmit}>

        <input type="text"
            placeholder="Origin"
            name="origin"
            onChange={props.handleChange}
            value={props.origin} required/>

        <input type="text"
            placeholder="Destination"
            name="destination"
            onChange={props.handleChange}
            value={props.destination} required/>

        <input type="submit"
          value="Get directions" />

      </form>
      
    </nav>
  )
}

export default Nav;