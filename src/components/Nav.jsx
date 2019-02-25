import React from 'react'

const Nav = (props) => {
  console.log(props)
  return (
    <nav>
      <input
        type="text"
        placeholder="Origin"
        name="origin"
        onChange={props.handleChange}
        value={props.origin} />
      <input
        type="text"
        placeholder="Destination"
        name="destination"
        onChange={props.handleChange}
        value={props.destination} />
    </nav>
  )
}

export default Nav;