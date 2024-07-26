import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(props) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false); // New state to track navbar visibility
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const hideNavbar = () => {
    setIsNavbarVisible(false);
  };

  const updateInput = (event) => {
    const value = event.target.value;
    setInput(value);
    props.check(value);
  };

  const getInput = () => {
    const value = input;
    props.check(value);
  };

  const runSearch = (event) => {
    if (event.key === "Enter") {
      getInput();
      navigate("/search");
    }
  };

  return (
    <div className="navbar-container">
      <ul id="navbar" className={isNavbarVisible ? "visible" : ""}>
        <NavLink to="/" onClick={hideNavbar}>
          <li>Home</li>
        </NavLink>
        <NavLink to="/movie" onClick={hideNavbar}>
          <li>Movies</li>
        </NavLink>
        <NavLink to="/series" onClick={hideNavbar}>
          <li>Series</li>
        </NavLink>
        <NavLink to="/latest_movies" onClick={hideNavbar}>
          <li>Latest Movies</li>
        </NavLink>
        <i className="fa-solid fa-x" id="crossIcon" onClick={hideNavbar}></i>
      </ul>
      <i
        className="fa-solid fa-bars"
        id="menuBar"
        onClick={toggleNavbarVisibility}
      ></i>
      <section className="searchSection">
        <div className="search-bar-container">
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={input}
            onChange={updateInput}
            onKeyDown={runSearch}
          />
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass" onClick={getInput}></i>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
