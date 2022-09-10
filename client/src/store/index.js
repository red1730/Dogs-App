import { createStore, applyMiddleware } from "redux" //Redux Toolkit  buscar aplicar
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from "../reducer"

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))