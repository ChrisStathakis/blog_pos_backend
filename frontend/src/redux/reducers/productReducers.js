import {PRODUCTS_ENDPOINT, CATEGORYS_ENDPOINT} from "../helpers/endpoints";

function productReducer(state, action){
    let lookupOptions = {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            };
    switch (action.type){
        case 'FETCH_PRODUCTS':
            fetch(PRODUCTS_ENDPOINT, lookupOptions).then(
                function (response) {
                    return response.json()
                }
            ).then(
                function(responseData){
                    return{
                        ...state,
                        products: responseData
                    }
                }
            );
        case 'FETCH_CATEGORIES':
            fetch(CATEGORYS_ENDPOINT, lookupOptions).then(
                function (response) {
                    return response.json()
                }
            ).then(
                function(responseData){
                    return{
                        ...state,
                        products: responseData
                    }
                }
            );
        default:
            return state
    }
}


export default productReducer;
