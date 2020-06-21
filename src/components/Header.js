import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ links }) => {
  let navLinks = [];
  for (let i = 0; i < links.length; i++) {
    navLinks.push(
      <li key={i}>
        <Link to={links[i].url}>{links[i].label}</Link>
      </li>,
    );
  }

  return (
    <header>
      <h1>RESTy</h1>
      <nav>
        <ul>{navLinks}</ul>
      </nav>
    </header>
  );
};

export default Header;
