import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <div className="main">
        <div className="logo">FOODISH</div>
        <div className="others">
          <p className="margin-10">About</p>
          <p className="margin-10">Privacy Policy</p>
          <p className="margin-10">Licensing</p>
          <p className="margin-10">Contact</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="center">
        <center>
          @ 2023 Foodish<sup>TM</sup>
        </center>
      </div>
    </div>
  );
}

export default Footer;
