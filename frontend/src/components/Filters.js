import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup } from 'reactstrap';


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories||[],
            selected_categories: []
        }
    }

    handleClear = () => {
        this.setState({
            selected_categories: []
        })
        this.props.handleSelectedCategories
    }

    handleSelectedCategories = (checked, id) => {
        if(checked){
            let selected_categories = this.state.selected_categories.concat(id)
            this.setState({
                selected_categories: selected_categories
                
            })
            this.props.handleSelectedCategories(selected_categories)
        } else {
            let selected_categories = this.state.selected_categories.filter(function(item){
                return item !== id
            })
            this.setState({
                selected_categories: selected_categories
            })
            this.props.handleSelectedCategories(selected_categories)
        }
        
    }

    render() {
        const categories = this.state.categories;
        return (
            <Form>
                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <CheckBoxComponent
                        field={category}
                        handleSelectedCategories={this.handleSelectedCategories}
                    />
                ))}
                
                <Button onClick={this.handleClear} color='danger'>Clear Filters</Button>
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
        const checked = e.target.checked
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.props.handleSelectedCategories(checked, this.props.field.id)
    };

    render(){
        const field = this.props.field;
        return(
            <FormGroup check>
                <label>{field.title}</label>
                <input 
                    type='radio' 
                    className='form-control' 
                    checked={this.state.isChecked}
                    onClick={this.handleChange}
                 />
                    
            </FormGroup>
        )
    }

}

export default Filters;