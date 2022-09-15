import axios from 'axios';

export function getDog () {
  return async function (dispatch){
    var json = await axios("http://localhost:3001/dogs",{});           
    return dispatch ({
    type: 'GET_DOG',
    payload : json.data
    })
  }
};

export function filterCreated(payload){
  return {
    type: 'FILTER_CREATED',
    payload
  }
};

export function orderByName(payload){
  return {
    type: 'ORDER_BY_NAME',  
    payload
  }
};

