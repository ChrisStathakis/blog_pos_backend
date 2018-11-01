import React from 'react';
import uuid from 'uuid';
import {createStore} from 'redux';
import MyNavbar from "../components/Navbar";

function reducer(state, action) {
    switch (action.type){
        case 'ADD_MESSAGE':
            const newMessage = {
                text: action.message,
                timestamp: Date.now(),
                id: uuid.v4()
            };
            const threadIndex = state.threads.findIndex(
                (t) => t.id === action.id
            );
            const oldThread = state.threads[threadIndex];
            const newThread = {
                ...oldThread,
                messages: oldThread.messages.concat(newMessage)
            };
            return{
                ...state,
                threads:[
                    ...state.threads.slice(0, threadIndex),
                    newThread,
                    ...state.threads.slice(threadIndex+1, state.threads.length)
                ]
            };
        case 'DELETE_MESSAGE':
            const threadIndex = state.threads.findIndex(
                (t) => t.messages.find((m)=>
                    m.id === action.id)
            );
            const oldThread = state.threads[threadIndex];

            const newThread = {
                ...oldThread,
                messages: oldThread.messages.filter((m)=>(
                    m.id !== action.id
                ))
            };

            return {
                ...state,
                threads: [
                    ...state.threads.slice(0, threadIndex),
                    newThread,
                    ...state.threads.slce(threadIndex+1, state.threads.length)
                ]
            }

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

class ChatPage extends React.Component{

    componentDidMount(){
        store.subscribe(()=>this.forceUpdate())
    }

    render(){
        const state = store.getState();
        const activeThreadId = state.activeThreadId;
        const threads = state.threads;
        const activeThread = threads.find((t)=>t.id === activeThreadId);

        const tabs = threads.map(t=>({
            title:t.title,
            active: t.id === activeThreadId
        }))

        return(
            <div>
                <MyNavbar/>
                <Container>
                    <Row>
                        <Col>
                            <ThreadTabs tabs={}{tabs} />
                            <Thread thread={activeThread} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

class ThreadTabs extends React.Component{

    render(){
        const tabs = this.props.tabs.map((tab, index)=>(
            <div
                key={index}
                className={tab.active ? 'active item': 'item'}
            >{tab.title}
            </div>
        ))
        return(
            <div className='ui top attached tabular menu'>
                {tabs}
            </div>
        )
    }
}

class MessageInput extends React.Component{
    state = {
        value: ''
    };

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            value: e.target.value
        })
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: this.state.value,
            threadId: this.props.threadId
        });

        this.setState({
            value: ''
        })
    }

    render(){
        return(
            <form className='form'>
                <input
                    onChange={this.onChange}
                    value={this.state.value}
                    type='text'
                    className='form-control'
                />
                <Button
                    color='primary'
                    onClick={this.handleSubmit}
                    type='submit'
                >Save
                </Button>
            </form>
        )
    }
}

class Thread extends React.Component{

    handleClick = (id) =>{
         store.dispatch({
             type: 'DELETE_MESSAGE',
             id:id
         })
     }

     render() {
        const messages = this.props.thread.messages.map((message, index)=>(
            <div
                className='comment'
                key={index}
                onClick={() => this.handleClick(message.id)}
            ><p>{message.text}</p><span>@{message.timestamp}</span>

            </div>
        ))
     }
}