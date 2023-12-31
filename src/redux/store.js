// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import rootReducer from "./rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, rootReducer)

// ** init middleware
const middleware = [thunk, createDebounce()];

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create store
const store = createStore(pReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

const persistor = persistStore(store);

export { store, persistor };
