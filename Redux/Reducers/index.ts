
import userReducer from './UserReducer';
import {combineReducers} from 'redux';
import { createStore } from 'redux';
//Combine all the sub reducers
const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer
export const store = createStore(rootReducer)
