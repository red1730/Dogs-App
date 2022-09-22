import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperament, getDog} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import "./styles/dogcreated.css"

///VALIDATION///
const validate = (input) => {
  let errors = {};
  if (!input.name) { // letras con espacio
    errors.name = "Name is required"
  }
 if (!input.height){
    errors.height = "Height is required" //numeros enteros positivos  /^-?\d*(\.\d+)?$/
  }
  if (!/^-?\d*(\.\d+)?$/.test(input.height) ){ //isNaN(input.height)
    errors.height = "Height must be a number."  
  }
  if (!input.weight ){
    errors.weight = "Weight is required"
  }
  if (!/^-?\d*(\.\d+)?$/.test(input.weight)){
    errors.weight = "Weight must be a number."  
  };
          return errors;  
};
///VALIDATION///

export default function DogCreate (){
  const dispatch = useDispatch()
  const history = useHistory()
  const temperament = useSelector((state) => state.temperament)
  const [errors, setErrors] = useState({})

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

  setErrors(validate({
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
if (!errors){alert("hay algun dato que no va")
}else{
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
}};



  return(
    <div className="form_total">
        <Link to= '/home'><button>Back</button></Link>
        <h1>Create your Dog!</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
              placeholder="Name"
              type= "text"
              value={input.name}
              name="name"
              onChange={handleChange}// se puede ejecutar el handle de esta manera tmb.
              />
              {errors.name && (
                <p className="error">{errors.name}</p>
              )}
              </div>
                          <div><input
              placeholder= "Max Height"
              type="text"
              value={input.height}
              name="height"   
              onChange={(e) => handleChange(e)}           
              />
              {errors.height && (
                <p className="error">{errors.height}</p>
              )}
              </div>
                          <div><input
              placeholder="Max Weight"
              type="text"
              value={input.weight}
              name="weight"
              onChange={handleChange}
              />
              {errors.weight && (
                <p className="error">{errors.weight}</p>
              )}
              </div>
                           <div><input 
              placeholder="Longevity"
              type="text"
              value={input.years}
              name= "years"
              onChange={handleChange}
              /></div>
                   <div><input 
              placeholder="Image url"
              type="text"
              value={input.image}
              name= "image"
              onChange={handleChange}
              /></div>
                            <select className="selectcreated" onChange={(e) => handleSelect(e)}>
                {temperament.map((temp) => (
                <option value={temp.name}>{temp.name}</option>
                ))}
              </select>
              <ul><li className="list">{input.temperament.map((el) => el + ", ")}</li></ul>
                    
                <button type="submit" className="buttoncreate">Create</button>   
        </form>

    </div>
  )


};