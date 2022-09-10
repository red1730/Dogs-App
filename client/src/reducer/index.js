
const initialState = {
  dogs = []
}

function rootReducer (state = initialState, action){
  switch(action.type) {
    case 'GET_DOG':
      return{
        ... state,
        dog: action.payload
      }
  }
}

export default rootReducer