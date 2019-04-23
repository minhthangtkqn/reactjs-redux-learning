import * as actionTypes from '../constants/ActionTypes';

var initialState = {
    by: 'name',
    value: 1
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SORT:
            var { by, value } = action.sort;
            return {
                ...state,
                by,
                value
            };
        default:
            return state;
    }
}

export default myReducer