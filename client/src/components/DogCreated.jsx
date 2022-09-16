import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperament, getDog} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate (){
  const dispatch = useDispatch()
  const temperament = useSelector((state) => state.temperament)

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    personality: []
  })

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch])

const handleChange =(e) => {
  setInput ({
    ...input,
    [e.target.name] : e.target.value // cargamos los name="" de cada input
  })
console.log
}




  return(
    <div>
        <Link to= '/home'><button>Back</button></Link>
        <h1>Create your Dog!</h1>
        <form>
            <div>
                              <label>Name: </label><input
              type= "text"
              value={input.name}
              name="name"
              onChange={handleChange}
              /></div>
                          <div><label>Max Height: </label><input
              type="text"
              value={input.height}
              name="height"   
              onChange={handleChange}           
              /></div>
                          <div><label>Max Weight: </label><input
              type="text"
              value={input.weight}
              name="weight"
              onChange={handleChange}
              /></div>
                           <div><label>Longevity: </label><input 
              type="text"
              value={input.years}
              name= "years"
              onChange={handleChange}
              /></div>
                          <div><label>Longevity: </label><input 
              type="text"
              value={input.years}
              name= "years"
              onChange={handleChange}
              /></div>
              <select>
                {temperament.map((temp) => (
                  <option value={temp.name}>{temp.name}</option>
                ))}
              </select>
                    <button type="submit">Create</button>      
        </form>

    </div>
  )


};