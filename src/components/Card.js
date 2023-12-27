import React from "react";
import "./Card.css";

function Card({ data }) {
  //   console.log(data);
  const { _id, name, imageUrl } = data;
  return (
    <div className="recipe-container">
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Card;
