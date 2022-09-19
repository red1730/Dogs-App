import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { filterCreated, getDog, orderByName, orderByWeight, getTemperament } from "../actions";
import { Link } from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./styles/home.css"


export default function Home (){
  

  const temperament = useSelector((state) => state.temperament)

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

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch])
  
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
  <Link to= "/dogcreated">Create Race</Link>
<h1 >Dogs.</h1>
<button className="reload" onClick={ (e) => handleClick(e)}>
Reload Races
</button>
<div>
    <SearchBar/>
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
                {temperament.map((temp) => (
                  <option value={temp.name}>{temp.name}</option>
                ))}
              </select>

    <Paginado
    dogsPerPage={dogsPerPage}
    allDogs= {allDogs?.length}
    paginado= {paginado}
    />

    {currentDogs?.map((c) => {
      return(
        <div className= 'card'>
          <Link to={"/home/" + c.id}>
            <Card 
              name={c.name}
              image={c.image? c.image : <img  alt="img"  src="https://www.infobae.com/new-resizer/L2RD4MJtKJPWIRMpQ-qwEfV07k8=/768x768/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/BLZJHTB27ZHUPKK3A7GXTMIEQA.jpg"/>}
              weight={c.weight}
              temperament={c.temperament}
              />
          </Link>

          
        </div>
       )
     })
    }
    </div>
     <Paginado
    dogsPerPage={dogsPerPage}
    allDogs= {allDogs?.length}
    paginado= {paginado}
    />
  </div>
  )
}