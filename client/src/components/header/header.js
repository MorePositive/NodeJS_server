import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutDeleteToken } from '../../redux/actions/user';
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav-bar light-blue accent-3">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">SK</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <button 
              onClick={() => dispatch(logoutDeleteToken())} 
              className="btn orange darken-1"
              >
                Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Header;
