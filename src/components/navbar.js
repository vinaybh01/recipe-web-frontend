import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";
import Logo from "./images/chef_450064.png";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" className="logo" />
        <p>FOODISH</p>
      </div>
      <div className="navbar-2">
        <Link to="/">HOME</Link>
        <Link to="/create-recipe">CREATE RECIPES</Link>
        <Link to="/saved-recipes">SAVED RECIPES</Link>
        {!cookies.access_token ? (
          <Link to="/auth">LOGIN/REGISTER</Link>
        ) : (
          <Link to="/auth" onClick={logout}>
            LOGOUT
          </Link>
        )}
      </div>
    </div>
  );
};
