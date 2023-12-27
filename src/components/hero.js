import React from "react";
import Video from "./images/video.mp4";
import "./hero.css";

function hero() {
  return (
    <div className="hero-video">
      <video
        src={Video}
        width="100%"
        fluid={false}
        autoPlay
        loop
        muted
        height="760px"
        className="video-background"
      />
      <div className="text">
        <h1>Create, share, and savor the magic of homemade recipes.</h1>
      </div>
    </div>
  );
}

export default hero;
