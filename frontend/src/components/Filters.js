import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Filters extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            search: '',
            selected_categories: []
        }
    }

    validate = (filters) => {
        let errors = {};
        if (filters.search.length > 0 && filters.search.length <3){
            errors.search='Too Short'
        }
        return errors
    };

    onformSubmit = (event) =>{
        event.preventDefault();
        const filters = this.state;
        const fieldsErrors  = this.validate(filters);

    }

    onChangeCheckbox = (event) =>{
        event.preventDefault();
        this.setState({
            selected_categories: [...this.state.selected_categories, event.target.value]
        })
    };

    render() {
        const categories = this.props.categories;
        console.log('props cate', categories);
        return (
            <Form>
                <FormGroup>
                    <Label>Search</Label>
                    <Input type="text" name='search' />
                </FormGroup>

                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <FormGroup check>
                    <Label check>
                        <Input onClick={this.onChangeCheckbox}
                               type="checkbox"
                               value={category.id}
                        />
                        {' '}
                         {category.title}
                    </Label>
                </FormGroup>
                ))}
                
                <Button>Submit</Button>
            </Form>
        )
    }
}

export default Filters;