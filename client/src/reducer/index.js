const initialState = {
  dogs: [],
  allDogs: [],
  temperament: [],
  detail: []
};

function rootReducer (state = initialState, action){
  switch(action.type) {
    
    case 'GET_DOG':
      return{
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };

    case 'POST_DOG':
        return {
          ...state,
        };
      
    case 'GET_TEMPERAMENT':
      return {
        ...state,
        temperament: action.payload
      };

    case 'GET_DOG_BY_NAME':
      return{
        ...state,
        dogs: action.payload
      };

      case 'GET_DETAIL':
        return {
          ...state,
          detail: action.payload
       };

       case 'FILTER_BY_TEMPERAMENT':
        const allDogs = state.allDogs; 
        const temperamentFiltered = action.payload === 'All' ? allDogs : allDogs.filter(el => {
            if (typeof (el.temperament) === 'string') return el.temperament.includes(action.payload);
            if (Array.isArray(el.temps)) {
                let temperamentss = el.temps.map(el => el.name);
                return temperamentss.includes(action.payload);
            }
            return true;
        });
        return {
            ...state,
            dogs: temperamentFiltered
        }
     
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

    case 'ORDER_BY_WEIGHT':
        let sorted_Arr_W = action.payload === 'wasc' ?
        state.dogs.sort(function (a, b) {
          if (a.weight > b.weight) {
            return 1 ;
          }
          if (b.weight > a.weight) {
            return -1 ;
          }
          return 0;
        }) :
        state.dogs.sort(function(a, b) {
          if (a.weight > b.weight) {
            return -1 ;
          }
          return 0
        })
        return {
          ...state,
          dogs: sorted_Arr_W
        };

    


    default:        
      return state;
  }
};
export default rootReducer ;

