import {combineReducers} from "redux";
import {getDefaultMiddleware, configureStore} from "@reduxjs/toolkit";
import tasksSlice from "./tasks";
import authSlice from "./auth";
import notificationSlice from "./notification";

const reducer = combineReducers({
  tasks: tasksSlice.reducer,
  auth: authSlice.reducer,
  notification: notificationSlice.reducer,
});

const middleware = [...getDefaultMiddleware()];

export default configureStore({reducer, middleware})
