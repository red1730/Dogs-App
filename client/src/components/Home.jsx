import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { getDog } from "../actions";
import { Link } from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home (){
  
  
  const dispatch = useDispatch()
  const allDogs = useSelector ((state) => state.dog) 
  const [currentPage, setCurrentPage] = useState(1) // pagina actual
  const [dogsPerPage] = useState(8) // personajes x pag
  const indexOfLastDog = currentPage * dogsPerPage // 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
  const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getDog());
  },[dispatch])
  
  const  handleClick =(e) =>{
    e.preventDefault();
    dispatchEvent(getDog());
  }

  return (
<div>
  <Link to= "dogs">Create race</Link>
<h1>Dogs</h1>
<button onClick={ e=> {handleClick(e)}}>
Reload races
</button>

<div>
    <select>
      <option value='ord'> Order</option>
      <option value= 'rsg'>Rising</option>
      <option value= 'dct'>Decent</option>
    </select>
    <select>
      <option value= 'wgt'>Weigth</option>
    </select>
    <select>
      <option value= 'rt'>Race type</option>
      <option value= 'all'>All</option>
      <option value= 'exs'>Existing</option>
      <option value= 'ctd'>Created</option>
    </select>
    <select value= 'temp'>Temperament
    </select>

    <Paginado
    dogsPerPage={dogsPerPage}
    allDogs= {allDogs?.length}
    paginado= {paginado}
    />

    {currentDogs?.map((c) => {
      return(
        <div className= 'cards'>
          <Link to={"/home/" + c.id}>
            <Card 
              name={c.name}
              image={c.image}
              weight={c.weight}
              temperament={c.temperament}
              />
          </Link>

          
        </div>
       )
     })
    }
     <Paginado
    dogsPerPage={dogsPerPage}
    allDogs= {allDogs?.length}
    paginado= {paginado}
    />
</div>
  </div>
  )
}