import React from "react";


export default function Paginado ({dogsPerPage, allDogs, paginado}){
  const pageNumber = []

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage)-1; i++){
    pageNumber.push(i+1)
    }

  return (
    <div>
    <nav>
      <ul className="paginado">
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