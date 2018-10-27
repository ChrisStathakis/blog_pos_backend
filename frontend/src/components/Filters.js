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

    handleCheckBoxInput = () => {

    }


    render() {
        const categories = this.props.categories;
        console.log(this.state.checkedItems);
        return (
            <Form>
                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <CheckBoxComponent
                        field={category}
                        handleCheckboxInput={this.handleCheckboxInput}
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
            isChecked: false
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            isChecked: !this.state.isChecked
        })
    };

    render(){
        const field = this.props.field;
        return(
            <FormGroup check>
                <Label check>
                    <Input
                        onClick={this.handleChange}
                        type="checkbox"
                        checked={this.state.isChecked}
                         />
                    {' '}{field.title}
                    </Label>
            </FormGroup>
        )
    }

}

export default Filters;