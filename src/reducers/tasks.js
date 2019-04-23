import * as ActionTypes from '../constants/ActionTypes';

var initialState = JSON.parse(localStorage.getItem('tasks'));

const generateRandomId = () => {
    return getRandomString() + getRandomString() + '-' + getRandomString() + getRandomString();
}
const getRandomString = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}
const findIndexById = (id, list) => {
    let result = -1;
    list.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    });
    return result;
}

const reducer = (state = initialState, action) => {
    // var id = '';
    var index = -1;
    switch (action.type) {
        case ActionTypes.LIST_ALL:
            return [...state];

        case ActionTypes.ADD_TASK:
            let newTask = {
                ...action.task,
                id: generateRandomId()
            };

            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case ActionTypes.UPDATE_TASK:
            index = findIndexById(action.task.id, state);
            state[index] = action.task;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case ActionTypes.TOGGLE_TASK_STATUS:
            index = findIndexById(action.id, state);

            state[index] = {
                ...state[index],
                status: !state[index].status
            };

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case ActionTypes.DELETE_TASK:
            index = findIndexById(action.id, state);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        default:
            return [...state];
    }
}

export default reducer