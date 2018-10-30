import React from 'react';
import uuid from 'uuid';
import MyNavbar from '../components/Navbar';
import {createStore} from 'redux';
import { Container, Col, Row } from 'reactstrap';

/*
function createStore(reducer, initialState){
    let state = initialState;
    const listeners = [];
    const subscribe = (listener) =>{
        listeners.push(listener)
    };

    const getState = () => (state);

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(l=>l())
    };

    return {
        dispatch,
        getState,
        subscribe
    }

}
*/

function reducer(state, action) {
    switch (action.type){
        case 'ADD_MESSAGE':
            const newMessage = {
                text: action.message,
                id: uuid.v4(),
                timestamp: Date.now()
            }
            const threadIndex = state.threads.findIndex(
                (t) => t.id == action.threadId
            )
            const oldThread = state.threads[threadIndex];
            const newThread = {
                ...oldThread,
                messages: oldThread.messages.concat(newMessage)
            }
            return {
                ...state,
                threads: [
                    ...state.threads.slice(0, threadIndex),
                    newThread,
                    ...state.threads.slice(threadIndex+1, state.threads.length)
                ]
            };
        case 'DELETE_MESSAGE':
            return{
                messages: state.messages.filter((m)=>(
                    m.id !== action.id
                )) 
            };
        default:
            return state
    }
}

const initialState = {
    activeThreadId: '1-fca2',
    threads: [
      {
        id: '1-fca2',
        title: 'Buzz Aldrin',
        messages: [
          {
            text: 'Twelve minutes to ignition.',
            timestamp: Date.now(),
            id: uuid.v4(),
          },
        ],
      },
      {
        id: '2-be91',
        title: 'Michael Collins',
        messages: [],
      },
    ],
  };

const store = createStore(reducer, initialState);

class Chat extends React.Component{

    componentDidMount(){
        store.subscribe(()=>this.forceUpdate())
    }

    render(){
        const state = store.getState();
        const activeThreadId = state.activeThreadId;
        const threads = state.threads;
        const activeThread = threads.find((t) => t.id === activeThreadId);
        const tabs = threads.map(t=> (
            {
                title: t.title,
                active: t.id === activeThreadId
            }
        ))
        
        return (
            <div>
                <MyNavbar />
                <Container>
                    <Row>
                        <Col>
                            <MessageView messages={messages} />
                            <MessageInput />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

class MessageInput extends React.Component{

    state = {
        value: ''
    }

    onChange = (e) => {
        e.preventDefault()
        this.setState({
            value: e.target.value
        })
        console.log('change!', this.state.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: this.state.value
        })
        this.setState({
            value:''
        })
    }

    render(){
        return(
            <form>
                <div className='form-group'>
                    <label>Add message</label>
                    <input type='text' onChange={this.onChange} value={this.state.value} />
                </div>
                <button className='btn btn-primary' onClick={this.handleSubmit}>Save</button>
            </form>
        )
    }
}

class MessageView extends React.Component{

    handleClick = (id) => {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id
        })
    }

    render(){
        const messages = store.getState().messages.map((message, index)=>(
            <p
                key={index}
                onClick={()=>this.handleClick(message.id)}
            >{message.text}@{message.timestamp}</p>
        ))
        return (
            <div>
                {messages}
            </div>
        )
    }
}

export default Chat;