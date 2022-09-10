import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { getDog } from "../actions";
import { Link } from "react-router-dom"; 


export default function Home (){
  
  
  const dipatch = useDispatch()
  const allDogs = useSelector ((state) => state.dogs) 

  useEffect (() => {
    dispatchEvent(getDog());
  },[])

  return (
<div>
  <Link to= "dogs">Create race</Link>
<h1>Udog</h1>
</div>

  )
}