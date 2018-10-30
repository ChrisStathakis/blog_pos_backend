
const initialState = {
    products: [],
    doneLoading: false,
    product:{
        title:'',
        category: '',
        value: 0,
        active: true
    }
};


function reducer(state, action){
    switch (action.type){
        case 'INCREMENT':
            return state + action.qty;
        case 'DECREMENT':
            return state - action.qty;
        default:
            return state;
    }
}