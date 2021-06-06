import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import sidebarReducer from "./sidebarReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;

export type InfernActionsTypes<T extends {[key: string]: (...args: any[])=> any}> =  ReturnType<PropertiesType<T>>;
declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
      store: any
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// window.store = store;

export default store;
