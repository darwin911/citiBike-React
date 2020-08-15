import React from 'react';
import citiBikeLogo from '../assets/images/citibike_logo.png';

export const Header = () => {
  return (
    <header>
      <img src={citiBikeLogo} className='logo' alt='CitiBike Logo' />
      {/* Citi<span>Bike</span> */}
    </header>
  );
};
