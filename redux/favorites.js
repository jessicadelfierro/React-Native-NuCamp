//import all the action types
import * as ActionTypes from './ActionTypes';

//favorites reducer function
//in the parameter list, pass the state and initialize it to an empty array (if it doesn't exist yet), also pass in the action
//switch statement to check for the action.type
//checks to see if the campsite ID already exists in the states array
//if the campsites ID doesn't exist in the array, it will return a new state, with the new favorite campsite ID concatenated to the end of it

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        default: 
            return state;
    }
};

//whenever new reducer is added, it needs to be added to the store with the combined reducers function (inside configurestore.js)