import { createStore, combineReducers } from "redux";
import initialState from "../constants/initial-state";

import orderReducer from "../reducers/orderReducer";

const rootReducer = combineReducers({
  orders: orderReducer,
});

export const store = createStore(rootReducer, initialState);
