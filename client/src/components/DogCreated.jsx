import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperament, getDog} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate (){
  const dispatch = useDispatch()
  const history = useHistory()
  const temperament = useSelector((state) => state.temperament)

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    image:"",
    temperament: []
  })
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch])
 
const handleChange = (e) => {
  setInput ({
    ...input,
    [e.target.name] : e.target.value // cargamos los name="" de cada input
  })
  console.log(input)
};

const handleSelect = (e) => {
setInput ({
  ...input,
  temperament: [ ...input.temperament, e.target.value]
 })
};

const handleSubmit = (e) => {
e.preventDefault();
console.log(input)
dispatch(postDog(input))
alert("Dog successfully created!!")
setInput({ // seteo nuevamente mi estado a 0
  name: "",
    height: "",
    weight: "",
    years: "",
    image: "",
    temperament: []
 })
 history.push('/home') // una vez creado, redirecciona
};



  return(
    <div>
        <Link to= '/home'><button>Back</button></Link>
        <h1>Create your Dog!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                              <label>Name: </label><input
              type= "text"
              value={input.name}
              name="name"
              onChange={handleChange}// se puede ejecutar el handle de esta manera tmb.
              /></div>
                          <div><label>Max Height: </label><input
              type="text"
              value={input.height}
              name="height"   
              onChange={(e) => handleChange(e)}           
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
                   <div><label>Image: </label><input 
              type="text"
              value={input.image}
              name= "image"
              onChange={handleChange}
              /></div>
                            <select onChange={(e) => handleSelect(e)}>
                {temperament.map((temp) => (
                  <option value={temp.name}>{temp.name}</option>
                ))}
              </select>
              <ul><li>{input.temperament.map((el) => el + ", ")}</li></ul>
                    <button type="submit">Create</button>      
        </form>

    </div>
  )


};