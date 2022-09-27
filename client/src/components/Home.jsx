import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getDog,
  orderByName,
  orderByWeight,
  filterDogsByTemperament,
  getTemperament,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./styles/home.css";
import "./styles/card.css";

export default function Home() {
  const temperament = useSelector((state) => state.temperament);

  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagina actual
  const [dogsPerPage] = useState(8); // personajes x pag
  const indexOfLastDog = currentPage * dogsPerPage; // 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDog());
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`);
  };

  const handleWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`);
  };

  function handleFilterTemperaments(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByTemperament(e.target.value));
  }

  return (
    <div>
      <div></div>
      <div className="home">
        <h1 className="titulo">Dogs.</h1>
        <button className="reload" onClick={(e) => handleClick(e)}>
          Reload Races
        </button>
        <div>
          <SearchBar className="filters" />
          <select className="filters_select" onChange={(e) => handleSort(e)}>
            <option value="asc">A-Z</option>
            <option value="dsc">Z-A</option>
          </select>
          <select className="filters_select" onChange={(e) => handleWeight(e)}>
            <option>Weigth</option>
            <option value="wasc">Ascending Weight</option>
            <option value="wdsc">Descending Weight</option>
          </select>
          <select
            className="filters_select"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="All">All</option>
            <option value="Existing">Existing</option>
            <option value="Created">Created</option>
          </select>
          <select
            className="filters_select"
            onChange={(e) => handleFilterTemperaments(e)}
          >
            <option value="All">All temperaments</option>
            {temperament
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((el) => {
                return (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
          </select>
          <div>
            <Link className="topBar" to="/dogcreated">
              Create Race
            </Link>
          </div>

          <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs?.length}
            paginado={paginado}
          />
          <div className="container">
            {currentDogs?.map((dog) => {
              return (
                <div key={dog.id}>
                  <Link to={`/dogs/${dog.id}`}>
                    <Card
                      key={dog.id}
                      name={dog.name}
                      image={dog.image}
                      weight={dog.weight}
                      temperament={
                        dog.createInDb
                          ? dog.temps.map((t) => t.name + " ")
                          : dog.temperament
                      }
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs?.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
