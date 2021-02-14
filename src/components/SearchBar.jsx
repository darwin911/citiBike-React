import React, { useState } from 'react';

import { MoonLoader } from 'react-spinners';
import { formatAddress } from '../services/helper';

export const SearchBar = ({
  isLoading,
  setIsLoading,
  filterStations,
  setResultStations,
}) => {
  const [inputOrigin, setInputOrigin] = useState('');
  const [inputDestination, setDestinationInput] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Geocodes user input and returns object with formatted address and coordinates (longitude and latitude)
    const originAddress = await formatAddress(inputOrigin);
    const destinationAddress = await formatAddress(inputDestination);
    // creates array object with coords with mapbox specifications (array[lng,lat])
    const originLngLat = [
      originAddress.geometry.location.lng,
      originAddress.geometry.location.lat,
    ];
    const destinationLngLat = [
      destinationAddress.geometry.location.lng,
      destinationAddress.geometry.location.lat,
    ];

    const filteredStations = filterStations(originLngLat, destinationLngLat);
    console.log(filteredStations.length);
    setResultStations(filteredStations);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.toLowerCase().includes('origin')) {
      setInputOrigin(value);
    } else if (name.toLowerCase().includes('destination')) {
      setDestinationInput(value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(inputOrigin, inputDestination);
  };

  return (
    <nav className='search-bar-container'>
      <form onSubmit={(e) => handleClick(e)}>
        <input
          className='origin-input'
          type='text'
          placeholder='I need a bike near...'
          name='origin'
          onChange={(e) => handleChange(e)}
          value={inputOrigin}
          required
        />

        <input
          className='destination-input'
          type='text'
          placeholder='Are there available docks at...?'
          name='destination'
          onChange={(e) => handleChange(e)}
          value={inputDestination}
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
