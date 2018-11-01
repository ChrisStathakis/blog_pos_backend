import {PRODUCTS_ENDPOINT} from '../helpers/endpoints.js'

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';




export default function fetchProductsAction(){
    return{
        type: FETCH_PRODUCTS,
        url: PRODUCTS_ENDPOINT
    }
}