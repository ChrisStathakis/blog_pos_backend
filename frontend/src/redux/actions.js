import PRODUCTS_ENDPOINT from '../helpers/endpoints.js'

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'




function fetchProductsAction(parameters){
    return{
        type: FETCH_PRODUCTS,
        parameters: PRODUCTS_ENDPOINT+ parameters
    }
}