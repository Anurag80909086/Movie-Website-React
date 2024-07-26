import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(props) {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const toggleActiveClass = () => {
    setIsActive(!isActive);
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
      <ul id="navbar">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/movie">
          <li>Movies</li>
        </NavLink>
        <NavLink to="/series">
          <li>Series</li>
        </NavLink>
      </ul>
      <i className="fa-solid fa-bars" id="menuBar"></i>
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
        <div className="theme-container" onClick={toggleActiveClass}>
          <div className="theme-switch-wrapper" id="themeContainer">
            <div
              className={`theme-switch ${isActive ? "active" : ""}`}
              id="themeSwitch"
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
