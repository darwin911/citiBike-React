import React from 'react';
import { MoonLoader } from 'react-spinners';

export const SearchBar = ({
  handleSubmit,
  handleChange,
  origin,
  destination,
  isLoading,
  setIsLoading
}) => {
  const handleClick = e => {
    e.preventDefault();
    setIsLoading();
    handleSubmit(origin, destination);
  };

  return (
    <nav className='search-bar-container'>
      <form onSubmit={e => handleClick(e)}>
        <input
          className='origin-input'
          type='text'
          placeholder='I need a bike near...'
          name='origin'
          onChange={handleChange}
          value={origin.text}
          required
        />

        <input
          className='destination-input'
          type='text'
          placeholder='Are there available docks at...?'
          name='destination'
          onChange={handleChange}
          value={destination.text}
          required
        />

        <button className='submit'>
          {isLoading ? (
            <MoonLoader
              size={32}
              color='white'
              css={{ width: 32, height: 32, margin: '0 auto' }}
            />
          ) : (
            'Go!'
          )}
        </button>
      </form>
    </nav>
  );
};
