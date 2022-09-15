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

export function getDogByName(name) {
  return async function (dispatch){
    try {
      var json = await axios("http://localhost:3001/dogs?name="+ name, {})
      return dispatch({
        type: 'GET_DOG_BY_NAME',
        payload : json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

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

export function orderByWeight(payload){
  return {
    type: 'ORDER_BY_WEIGHT',  
    payload
  }
};

