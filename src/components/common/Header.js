import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/records" activeStyle={activeStyle}>
        Employee records
      </NavLink>
    </nav>
  );
};

export default Header;
