import {createStore} from 'redux';
import productReducer from './reducers.js'



const initialState = {
    products: {},
    categories: {}
};

const store = createStore(productReducer, initialState);

export default store;