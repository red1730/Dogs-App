import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { filterCreated, getDog, orderByName } from "../actions";
import { Link } from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home (){
  


  const dispatch = useDispatch()
  const allDogs = useSelector ((state) => state.dogs) 
  const [orden, setOrden] = useState('')
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

const handleFilterCreated = (e) =>{
  dispatch(filterCreated(e.target.value))
}

const handleSort = (e) => {
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrden(`Order ${e.target.value}`)
}



  return (
<div>
  <Link to= "dogs">Create race</Link>
<h1>Dogs</h1>
<button onClick={ e=> {handleClick(e)}}>
Reload races
</button>

<div>
    <select onChange={(e) => handleSort(e)}>
      <option value= 'asc'>Rising</option>
      <option value= 'dsc'>Decent</option>
    </select>
    <select>
      <option value= 'wgt'>Weigth</option>
    </select>
    <select onChange={(e) => handleFilterCreated(e)}>
      <option value= 'All'>All</option>
      <option value= 'Existing'>Existing</option>
      <option value= 'Created'>Created</option>
    </select>
    <select>
    <option value= 'tmp'>Temperament </option>
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