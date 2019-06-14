import React from "react";

const SearchBar = ({ handleSubmit, handleChange, origin, destination }) => {
  return (
    <nav>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(origin, destination);
        }}
      >
        <input
          className="origin-input"
          type="text"
          placeholder="Origin"
          name="origin"
          onChange={handleChange}
          value={origin}
          required
        />

        <input
          className="destination-input"
          type="text"
          placeholder="Destination"
          name="destination"
          onChange={handleChange}
          value={destination}
          required
        />

        <input className="submit" type="submit" value="Find Stations" />
      </form>
    </nav>
  );
};

export default SearchBar;
