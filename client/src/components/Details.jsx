import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

export default function Detail (props){
    console.log(props)
    const dispatch = useDispatch ()
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

const myDog = useSelector ((state) => state.detail)

return (
    <div>
        {
            myDog.length > 0 ?
            <div>
                <img src={myDog.image ? myDog.image : myDog.img} alt="" width="350px" height="350px" />
                <h1>{myDog.name}</h1>
                <h5>{myDog.weight}</h5>
                <h5>{myDog.height}</h5>
                <h5>{myDog.years}</h5>
                <h5>{!myDog.createdInDb ? myDog.temperament + ' ' : myDog.temperament.map(el => el.name + (' '))}</h5>

            </div> : <p>Loading...</p>
        }
        <Link to= "/home">
        <button>Back</button>    
        </Link>   

    </div>
)

}