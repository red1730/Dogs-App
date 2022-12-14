import axios from "axios";

export function getDog() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/dogs", {});
    return dispatch({
      type: "GET_DOG",
      payload: json.data,
    });
  };
}

export function getDogByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/dogs?name=" + name, {});
      return dispatch({
        type: "GET_DOG_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("No matches.");
    }
  };
}

export function getTemperament() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/temperament", {});
    return dispatch({
      type: "GET_TEMPERAMENT",
      payload: json.data,
    });
  };
}

export function postDog(name) {
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/dogs", name);
    console.log(json);
    return json;
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterDogsByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}



// Promise:
// export function getDetail(id){
//     return function (dispatch){
//         var json = axios('http://localhost:3001/dogs/' + id)
//             .then(res => res.data)
//             .catch(err => console.log(err));
//         return dispatch({
//             type: GET_DETAIL,
//             payload: json,
//         })
//     }
// }


export function deleteDog(id){
  return async function (dispatch) {
    try{
       var json = axios.delete('http://localhost:3001/dogs/' + id)
       return dispatch({
        type: "DELETE_DOG",
        payload:json.data 
       }
       )

    }catch(error){
      console.log(error)
    }
  }
}