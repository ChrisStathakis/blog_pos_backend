import {ADD_DATA, FETCH_DATA} from "../../helpers/action_types";
import {ORDER_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionsGET} from "../../helpers/fetch_data";

export default function orderReducer(state, action) {


}

function orderItemReducer(state, action){
    switch (action.type) {
        case FETCH_DATA:
            fetch(ORDER_ENDPOINT, lookupOptionsGET).then(
                response => response.json()
            ).then(json=> state=json);
        case ADD_DATA:
            console.log('works!')
    }

}