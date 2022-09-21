import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import "./styles/details.css"

export default function Detail (props){
    console.log(props)
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

const myDog = useSelector ((state) => state.detail)///

return (
    <>
    <div className="details">
        {
            myDog.length > 0 ?
            <div>
        <Link to= "/home">
        <button className="buttonBack">Back</button>    
        </Link>   

                <div className="image">
                <img src={myDog[0].image} alt= "not found" width="650px" height="450px" />

                </div>
                <div className="info">
                <h1>{myDog[0].name}</h1>
                <h5>Weight: {myDog[0].weight}</h5>
                <h5>Height: {myDog[0].height}</h5>
                <h5>Longevity: {myDog[0].years}</h5>
                <h5>Temperament: {myDog[0].createdInDB ? myDog[0].temps.map( t => t.name + ' ') : myDog[0].temperament }</h5>
                </div>

            </div> : <p>Loading...</p>
        }
        </div>
        <div>


    </div>
    </>
)

}

// import React from 'react'
// import {Link} from 'react-router-dom'
// import {useDispatch, useSelector} from 'react-redux'
// import {useEffect} from 'react'
// import { getDogDetails } from '../actions'



// function DogDetail(props) {
//   const id= props.match.params.id
//   console.log(props)
//   const dispatch= useDispatch()

//   useEffect(()=>{
//     dispatch(getDogDetails(id))
//   },[])

// const dogdetails= useSelector((state)=> state.dogdetails)
//   return (
//     <div>
//       <Link to='/home'>
//         <button>Volver</button>
//       </Link>
//       {
//         dogdetails.length > 0 ? 
//         <div>
//           <img src={dogdetails[0].image} alt='no found' width='400px' height='300px' />
//           <h1>Raza{' '} {dogdetails[0].name}</h1>
//           <h3>Temperamento{' '}{dogdetails[0].createdInDB ? dogdetails[0].temperaments.map(t=>t.name+ ' ') :dogdetails[0].temperament+ ' ' }</h3>
//           <h3>Altura mínima {' '} {dogdetails[0].height_min}</h3>
//           <h3>Altura máxima {' '} {dogdetails[0].height_max}</h3>
//           <h3>Peso mínimo{' '} {dogdetails[0].weight_min}</h3>
//           <h3>Peso máximo{' '} {dogdetails[0].weight_max}</h3>
//           <h3>Años de vida{' '} {dogdetails[0].life_span}</h3>
//         </div> : <p>Loading... </p>
//       }
//     </div>
//   )
// }

// export default DogDetail