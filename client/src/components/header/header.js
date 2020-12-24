import React from 'react';
import './header.css';

const Header = ({ logoutDeleteToken }) => {

  return (
    <nav className="nav-bar light-blue accent-3">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">SK</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><button onClick={() => logoutDeleteToken()} className="btn orange darken-1">Logout</button></li>
        </ul>
      </div>
    </nav>
  )
};

export default Header;
