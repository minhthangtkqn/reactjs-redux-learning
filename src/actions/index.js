import * as ActionTypes from '../constants/ActionTypes';

export const listAll = () => ({
    type: ActionTypes.LIST_ALL
})

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    task
})

export const deleteTask = (id) => ({
    type: ActionTypes.DELETE_TASK,
    id
})

export const updateTask = (task) => ({
    type: ActionTypes.UPDATE_TASK,
    task
})

export const onToggleForm = () => ({
    type: ActionTypes.TOGGLE_ADD_FORM
})

export const onCloseForm = () => ({
    type: ActionTypes.CLOSE_ADD_FORM
})

export const onOpenForm = () => ({
    type: ActionTypes.OPEN_ADD_FORM
})

export const onToggleTaskStatus = (id) => ({
    type: ActionTypes.TOGGLE_TASK_STATUS,
    id
})