import React from 'react';

const SearchBar = ({ handleSubmit, handleChange, origin, destination }) => {
  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <nav className='search-bar-container'>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(origin, destination);
        }}>
        <input
          className='origin-input'
          type='text'
          placeholder='Origin'
          name='origin'
          onChange={handleChange}
          value={origin.text}
          required
        />

        <input
          className='destination-input'
          type='text'
          placeholder='Destination'
          name='destination'
          onChange={handleChange}
          value={destination.text}
          required
        />

        <input className='submit' type='submit' value='Go!' />
      </form>
    </nav>
  );
};

export default SearchBar;
