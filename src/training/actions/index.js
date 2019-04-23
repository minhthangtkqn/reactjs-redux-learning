import * as actionTypes from '../constants/ActionTypes';

export const sortAction = (sort) => ({
    type: actionTypes.SORT,
    sort
})

export const toggleStatusAction = () => ({
    type: actionTypes.TOGGLE_STATUS
})