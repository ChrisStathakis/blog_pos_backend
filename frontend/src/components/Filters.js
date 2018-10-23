import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories
        }
    }

    add_category = (value) => {
        console.log('add', value)
    };

    remove_category  = (value) => {
        console.log('remove', value)
    };


    render() {
        const categories = this.props.categories;
        console.log(this.state.checkedItems);
        return (
            <Form>
                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <CheckBoxComponent
                        field={category}
                        add_category={this.add_category}
                        remove_category={this.remove_category}
                    />
                ))}
                
                <Button>Submit</Button>
            </Form>
        )
    }
}

class CheckBoxComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isChecked:false
        }
    }

    handleChecked = (evt) =>{
        evt.preventDefault();
        this.setState({isChecked: !this.state.isChecked});
        this.handleChange()
    };

    handleChange = () => {
        const value = this.props.value;
        const isChecked = this.state.isChecked;
        if (isChecked){
           this.props.add_category(value)
        }
        else {
            this.props.remove_category(value)
        }
    };

    render(){
        const field = this.props.field;
        return(
            <FormGroup check>
                <Label check>
                    <Input
                        onClick={this.handleChecked}
                        type="checkbox"
                        checked={this.state.isChecked}
                        value={field.id} />
                    {' '}{field.title}
                    </Label>
            </FormGroup>
        )
    }

}

export default Filters;