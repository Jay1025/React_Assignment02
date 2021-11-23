import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import dictionary from "./modules/dictionary";
import thunk from "redux-thunk";

const middlewares = [thunk];
const rootReducer = combineReducers({dictionary});

const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;