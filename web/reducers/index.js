import { combineReducers } from 'redux'
import newbox from './newbox.js'
import boxes from './boxes.js'


const rootReducer = combineReducers({newbox, boxes});
export default rootReducer;