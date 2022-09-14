const initialState = {
  dogs : [],
  allDogs: []
}

function rootReducer (state = initialState, action){
  switch(action.type) {
    
    case 'GET_DOG':
      return{
        ...state,
        dog: action.payload,
      }
     
        case 'FILTER_CREATED':   
          const allDogsfilter = state.dogs       
          const createdFilter = action.payload === 'Created' ? allDogsfilter.filter((el) => el.createInDb) : allDogsfilter.filter(el => !el.createInDb) 

        return {
        ...state,
        dogs : action.payload === 'All' ? allDogsfilter: createdFilter,
        }
        

      default:
        
      return state;
  }
}

export default rootReducer ;

