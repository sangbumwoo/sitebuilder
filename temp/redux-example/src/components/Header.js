import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w3-bar w3-black">
      <Link className="w3-bar-item w3-button" to="/home">
        home
      </Link>
      <Link className="w3-bar-item w3-button" to="/about">
        about
      </Link>
    </div>
  );
};

export default Header;