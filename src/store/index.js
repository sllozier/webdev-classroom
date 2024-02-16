// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from "redux-thunk";

import accountReducer from "./reducers/accountSlice";
import classReducer from "./reducers/classSlice";
import adminReducer from "./reducers/adminSlice";
import authReducer from "./reducers/authSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";

export default configureStore({
  reducer: {
    account: accountReducer,
    admin: adminReducer,
    auth: authReducer,
    class: classReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
