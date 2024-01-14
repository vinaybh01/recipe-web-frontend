import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div>
      <div>
        <div style={{ padding: "0px 12px" }} className="spinner-container">
          <div className="loading-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
