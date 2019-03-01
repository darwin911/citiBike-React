import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: '',
      destination: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {

    return (
      <nav>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.history.push('/results');
          this.props.onSubmit(this.state.origin, this.state.destination)
          this.setState({
            origin: '',
            destination: ''
          })
        }}>

          <input
            className="origin-input"
            type="text"
            placeholder="Origin"
            name="origin"
            onChange={this.handleChange}
            value={this.state.origin} required />

          <input
            className="destination-input"
            type="text"
            placeholder="Destination"
            name="destination"
            onChange={this.handleChange}
            value={this.state.destination} required />

            <input
              className="submit"
              type="submit"
              value="Find Stations" />

        </form>

      </nav>
    )
  }
}

export default withRouter(Nav);