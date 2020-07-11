import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import basketReducer from "./Reducers/basketReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { reducer as formReducer } from "redux-form";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = compose;

//store creation
// return createStore(
//   combineReducers({
//     basket: basketReducer,
//   }),

//   composeEnhancers(applyMiddleware(thunk))
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

let store;

const isClient = typeof window !== "undefined";

const rootReducer = combineReducers({
  basket: basketReducer,
  form: formReducer,
});

if (isClient) {
  console.log("Persistant");
  // const { persistReducer } = require("redux-persist");
  // const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["basket"], // only navigation will be persisted
    stateReconciler: hardSet,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
} else {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
}

const persistor = persistStore(store);
// persistor.purge();
export { store, persistor };

// const initStore = (initialState) => {
//   //store creation
//   // return createStore(
//   //   combineReducers({
//   //     basket: basketReducer,
//   //   }),

//   //   composeEnhancers(applyMiddleware(thunk))
//   //   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   // );

//   let store;

//   const isClient = typeof window !== "undefined";

//   const rootReducer = combineReducers({
//     basket: basketReducer,
//     form: formReducer,
//   });

//   if (isClient) {
//     console.log("Persistant");
//     // const { persistReducer } = require("redux-persist");
//     // const storage = require("redux-persist/lib/storage").default;

//     const persistConfig = {
//       key: "root",
//       storage: storage,
//       whitelist: ["basket"], // only navigation will be persisted
//       stateReconciler: hardSet,
//     };

//     store = createStore(
//       persistReducer(persistConfig, rootReducer),
//       undefined,
//       composeWithDevTools(applyMiddleware(ReduxThunk))
//     );

//     store.__PERSISTOR = persistStore(store);

//   } else {
//     store = createStore(
//       rootReducer,
//       initialState,
//       composeWithDevTools(applyMiddleware(ReduxThunk))
//     );
//   }

//   //TODO remove devtools
//   // return createStore(
//   //   rootReducer,
//   //   persistedState,
//   //   composeWithDevTools(applyMiddleware(ReduxThunk))
//   // );
//   return store;
// };

// export default initStore;
