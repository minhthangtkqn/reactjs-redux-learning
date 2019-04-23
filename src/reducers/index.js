import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';


const rootReducer = combineReducers({
    tasks,
    isDisplayForm
});

export default rootReducer