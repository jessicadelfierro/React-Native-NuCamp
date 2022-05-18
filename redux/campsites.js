//imports all the action types
import * as ActionTypes from './ActionTypes';

//exports the campsites reducer
//takes the campsites section of the state and initializes it with the default function parameters syntax (if it hasnt already been initialized) then takes the action that it was dispatched to it 
//and depending on what that action is it creates and returns a new state
//or if none of the actions match, it just returns the previous state without doing anything to it.
export const campsites = (state = { isLoading: true,
                                     errMess: null,
                                     campsites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};