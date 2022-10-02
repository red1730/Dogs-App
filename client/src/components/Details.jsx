import React from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDog } from "../actions";
import "./styles/details.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const id = props.match.params.id;

  let history = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteDog(id));
    alert("Dog deleted");
    history.push("/home");
  };

  return (
    <>
      <div className="details">
        {myDog.length > 0 ? (
          <div>
            <div className="image">
              <img
                src={myDog[0].image}
                alt="not found"
                width="450px"
                height="300px"
              />
            </div>
            <div className="info">
              <h1>{myDog[0].name}</h1>
              <h5>Weight: {myDog[0].weight} Kgs.</h5>
              <h5>Height: {myDog[0].height} cm.</h5>
              <h5>Longevity: {myDog[0].years}.</h5>
              <h5>
                Temperament:{" "}
                {myDog[0].createInDb
                  ? myDog[0].temps.map((t) => t.name + " ")
                  : myDog[0].temperament}
                .
              </h5>
              <Link to="/home">
                <button className="buttonBack">Back</button>
              </Link>
              <div>
                {myDog[0].createInDb ? (
                  <button className="deleted" onClick={(e) => handleClick(e)}>
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="Loading">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div></div>
    </>
  );
}
