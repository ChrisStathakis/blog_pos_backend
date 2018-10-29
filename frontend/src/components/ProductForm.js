import React from 'react';

export default class ProductForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            category: '',
            value: '',
            active: true
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.refs.title.value)
    }

    render(){

        return (
            <div>
                <h4>Create Product</h4>
                <form className='form'>
                    <div className='form-group'>
                        <label>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            name='title'
                            ref='title'
                            value='hello!'
                        />
                    </div>
                    <button onClick={this.onFormSubmit} className='btn btn-primary'>Save</button>
                </form>
            </div>
        )
    }
}

