import React from "react";
import "./styles/pagination.css"


export default function Paginado ({dogsPerPage, allDogs, paginado}){
  const pageNumber = []

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage)-1; i++){
    pageNumber.push(i+1)
    }

  return (
    <div >
    <nav>
      <ul className="pagination">
      { pageNumber && 
      pageNumber.map( number =>(
        <button className="number" key={number}>
          <a href onClick={()=>paginado(number)}>{number}</a>
        </button>
    ))
    }
    </ul>
    </nav>
    </div>
  )
}