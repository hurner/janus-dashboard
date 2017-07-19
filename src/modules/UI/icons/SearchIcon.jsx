import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

const SearchIcon = ({ className }) => {
  return (
    <div className={className}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
          <path fill="#9B9B9B" d="M16.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 17 9.5a6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L21.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"/>
          <path d="M0 0h24v24H0z"/>
        </g>
      </svg>
    </div>
  );
};

export default SearchIcon;

