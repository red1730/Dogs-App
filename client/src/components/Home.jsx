import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { filterCreated, getDog, orderByName, orderByWeight } from "../actions";
import { Link } from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./styles/home.css"

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
  
const handleClick = (e) =>{
    e.preventDefault();
    dispatch(getDog());
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

const handleWeight = (e) => {
  e.preventDefault();
  dispatch(orderByWeight(e.target.value))
  setCurrentPage(1);
  setOrden(`Order ${e.target.value}`)
}


  return (
<div className="home">
  <Link to= "dogs">Create Race</Link>
<h1>Dogs</h1>
<button className="reload" onClick={ (e) => handleClick(e)}>
Reload Races
</button>
<div>
    <select onChange={(e) => handleSort(e)}>
      <option value= 'asc'>A-Z</option>
      <option value= 'dsc'>Z-A</option>
    </select>
    <select onChange={(e) => handleWeight(e)}>
      <option >Weigth</option>
      <option value="wasc">Ascending Weight</option>
      <option value="wdsc">Descending Weight</option>
    </select>
    <select onChange={(e) => handleFilterCreated(e)}>
      <option value= 'All'>All</option>
      <option value= 'Existing'>Existing</option>
      <option value= 'Created'>Created</option>
    </select>
    <select>
    <option value= 'tmp'>Temperament </option>
    </select>
    <SearchBar/>

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