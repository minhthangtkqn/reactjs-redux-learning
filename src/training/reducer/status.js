import * as actionTypes from '../constants/ActionTypes';

var initialState = false;

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_STATUS:
            return (!state);
        default:
            return state;
    }
}

export default myReducer