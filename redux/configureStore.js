import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites'

//key and storage properties are required
const config = {
    key: 'root',
    storage,
    debug: true
}

//this function returns the result of calling the redux function createStore with a combine reducers argument that combines all the reducers into a single root reducer
export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    //enables the store to be persisted, variable will be used in app.js
    const persistor = persistStore(store);

    //return object that contains both purchase store and the store so that we can access both from app.js
    return { persistor, store };
}