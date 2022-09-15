import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../actions";

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
            <input
            type= "text"
            placeholder = "Search..."
            onChange={(e) => handleInputChange(e)}
            >
            </input>
                <button type= 'submit' onSubmit={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}