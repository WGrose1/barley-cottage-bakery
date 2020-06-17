import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import basketReducer from "./Reducers/basketReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

const initStore = () => {
  //store creation
  // return createStore(
  //   combineReducers({
  //     basket: basketReducer,
  //   }),

  //   composeEnhancers(applyMiddleware(thunk))
  //   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // );

  const rootReducer = combineReducers({
    basket: basketReducer,
    form: formReducer,
  });
  //TODO remove devtools
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
};

export default initStore;
