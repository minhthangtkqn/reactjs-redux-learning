import * as ActionTypes from '../constants/ActionTypes';

var initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_ADD_FORM:
            let newState = !state;
            return newState;

        case ActionTypes.OPEN_ADD_FORM:
            return true;

        case ActionTypes.CLOSE_ADD_FORM:
            return false;

        default:
            return state;
    }
}

export default reducer