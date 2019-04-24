import * as ActionTypes from '../constants/ActionTypes';

var initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_EDITING_TASK:
            return action.task;

        default:
            return state;
    }
}

export default reducer