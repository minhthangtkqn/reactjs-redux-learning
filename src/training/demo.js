import { createStore } from 'redux';
import * as actions from './actions';
import myReducer from './reducer';

const store = createStore(myReducer);

console.log('1: ', store.getState());

store.dispatch(actions.toggleStatusAction());

console.log('2: ', store.getState());

store.dispatch(actions.sortAction({
    by: 'name',
    value: -1
}));

console.log('3: ', store.getState());