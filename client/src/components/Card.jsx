import React from "react";
import "./styles/card.css"

export default function Card({name, image, temperament,weight, temps}){
  return (
    <div  className="card">
      <img src={image} alt="img not found"  width="200px" height="200px" />
      <h3>{name}</h3>
      <h5>Weight: {weight}</h5>
      <h5>Temperament: {temperament}</h5>
    </div>
  );
};