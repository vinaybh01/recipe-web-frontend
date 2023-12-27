import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="spinner">
      {/* You can use any kind of loading animation here */}
      <div className="spinner-inner"></div>
    </div>
  );
}

export default Loading;
