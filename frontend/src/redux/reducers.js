import React from 'react';
import {combineReducers} from 'redux'
import orderReducer from './reducers/orderReducers.js'
import productReducer from './reducers/productReducers.js'

const reducer = combineReducers({
    orderReducer: orderReducer,
    productReducer: productReducer
});