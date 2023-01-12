import Link from 'next/link';
import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = () => {
  const [navAccountDropdown, setNavAccountDropdown] = useState(false);
  const [mobileNavBar, setMobileNavBar] = useState(false);

  const toggleNavAccountDropdown = () => {
    setNavAccountDropdown(!navAccountDropdown);
  };
  const toggleMobileNavBar = () => {
    setMobileNavBar(!mobileNavBar);
  };

  return (
    <header>
      <nav className={mobileNavBar ? 'open' : ''}>
        <div
          className={`menu-icon ${mobileNavBar ? 'open' : ''}`}
          onClick={toggleMobileNavBar}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link href="/" className="logo">
          Yomi Akande
        </Link>
        <input
          type="text"
          className="nav-search"
          id="navSearch"
          placeholder="Search products here..."
        />
        <div className="menu-list">
          <Link href="#" className="nav-account">
            <span onClick={toggleNavAccountDropdown}>
              <PersonOutlineIcon /> Account
            </span>
            {navAccountDropdown && (
              <div className="nav-account-dropdown">
                <Link href="/">My Account</Link>
                <Link href="/">My Orders</Link>
                <Link href="/">Watchlist</Link>
                <Link href="/" className="dropdown-btn">
                  Sign in
                </Link>
              </div>
            )}
          </Link>
          <Link href="/" className="nav-help">
            <span>
              <HelpOutlineIcon /> Help
            </span>
          </Link>
          <Link href="/cart" className="nav-cart">
            <span>
              <ShoppingCartOutlinedIcon /> <p>Cart</p>
              <span className="cart-count">6</span>
            </span>
          </Link>
        </div>
        {mobileNavBar && (
          <div className="mobile-menu-list">
            <Link href="/">My Account</Link>
            <Link href="/">My Orders</Link>
            <Link href="/">Watchlist</Link>
            <Link href="/">Help</Link>
            <Link href="/" className="dropdown-btn">
              Sign in
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
