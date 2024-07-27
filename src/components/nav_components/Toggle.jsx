import React from "react";
import { NavLink } from "react-router-dom";
const Toggle = () => {
  return (
    <div className="toggleContainer">
      <div className="toggleItems">
        <NavLink to="movies">Movies</NavLink>
        <NavLink to="series">Series</NavLink>
      </div>
    </div>
  );
};

export default Toggle;
