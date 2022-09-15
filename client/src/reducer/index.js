const initialState = {
  dogs: [],
  allDogs: []
};

function rootReducer (state = initialState, action){
  switch(action.type) {
    
    case 'GET_DOG':
      return{
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };
     
    case 'FILTER_CREATED':   
          const createdFilter = action.payload === 'Created' ? state.allDogs.filter((el) => el.createInDb) : state.allDogs.filter((el) => !el.createInDb) 
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter,
      };
        
    case 'ORDER_BY_NAME':
        let sorted_Arr = action.payload === 'asc' ?
        state.dogs.sort(function (a,b) {
          if (a.name > b.name) {
            return 1 ;
          }
          if (b.name > a.name) {
            return -1 ;
          }
          return 0;
        }) :
        state.dogs.sort(function(a, b) {
          if (a.name > b.name) {
            return -1 ;
          }
          return 0
        })
        return {
          ...state,
          dogs: sorted_Arr
        };

    default:        
      return state;

  }
};
export default rootReducer ;

