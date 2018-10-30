import React from 'react';

function createStore(reducer, initialState){
    let state = initialState;
    const listeners = [];
    const subscribe = (listener) =>{
        listeners.push(listener)
    };

    const getState = () => (state);

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(i=>l())
    };

    return {
        dispatch,
        getState,
        subscribe
    }

}

function reducer(state, action) {
    switch (action.type){
        case 'ADD_MESSAGE':
            return {
                messages: state.messages.concat(action.message)
            };
        case 'DELETE_MESSAGE':
            return{
                messages: [
                    ...state.messages.slice(0, action.index),
                    ...state.messages.slice(action.index+1, state.messages.length)
                ]
            };
        default:
            return state
    }
}

const initialState = {messages: []};
const store = createStore(reducer, initialState);

class Chat extends React.Component{

    componentDidMount(){
        store.subscribe(()=>this.forceupdate())
    }

    render(){
        const messages = store.getState().messages;
    }
}