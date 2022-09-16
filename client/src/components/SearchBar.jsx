import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../actions";
import "./styles/searchbar.css"

export default function SearchBar (){
    const dispatch = useDispatch()
    const[name, setName] = useState("") 

const handleInputChange = (e) => {
    e.preventDefault()
setName(e.target.value)
console.log(name)
};

const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getDogByName(name))
};

    return(
        <div>
            <input className="inputsearchbar"
            type= "text"
            placeholder = "Search..."
            onChange={(e) => handleInputChange(e)}
            >
            </input>
                <button className="buttonsearch" type= 'submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}