import axios from 'axios';

export function getDog () {
  return async function (dispatch){
    var json = await axios("http://localhost:3001/dogs") // el GET lo hace implicitamente el axios : axios.get   
  
    return dispatch ({
    type: 'GET_DOGS' ,
    payload : json.data
    })
  }


}