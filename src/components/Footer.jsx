import React from 'react';

export const Footer = () => {
  return (
    <footer>
      <p>
        Built with <span className='react-icon' aria-label='React Icon' /> React using NYC Open Data
        (CitiBike).
      </p>
      <h6>
        <a href='http://www.github.com/darwin911/' target='_blank' rel='noopener noreferrer'>
          &copy; Darwin Smith – 2019
        </a>
      </h6>
    </footer>
  );
};
