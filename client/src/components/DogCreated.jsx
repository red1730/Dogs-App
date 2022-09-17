import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperament, getDog} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

///VALIDATION///
const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required"
  }
 if (!input.height){
    errors.height = "Height is required"
  }
  if (typeof input.height !== "number" ){
    errors.height = "Height must be a number."  
  }
  if (!input.weight){
    errors.weight = "Weight is required"
  }
  if (typeof input.weight !== "number" ){
    errors.weight = "Weight must be a number."  
  };

  return errors;
  
};
///VALIDATION///

export default function DogCreate (){
  const dispatch = useDispatch()
  const history = useHistory()
  const temperament = useSelector((state) => state.temperament)
  const [errors, setErros] = useState({})

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

  setErros(validate({
    ...input,
    [e.target.name]: e.target.value
  }))
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
              />
              {errors.name && (
                <p className="error">{errors.name}</p>
              )}
              </div>
                          <div><label>Max Height: </label><input
              type="text"
              value={input.height}
              name="height"   
              onChange={(e) => handleChange(e)}           
              />
              {errors.height && (
                <p className="error">{errors.height}</p>
              )}
              </div>
                          <div><label>Max Weight: </label><input
              type="text"
              value={input.weight}
              name="weight"
              onChange={handleChange}
              />
              {errors.weight && (
                <p className="error">{errors.weight}</p>
              )}
              </div>
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