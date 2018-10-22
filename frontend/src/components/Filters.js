import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Filters extends React.Component {

    onChangeCheckbox = (event) =>{
        event.preventDefault();
        const id = event.target.value;
        this.props.filterProducts(id)
    };

    render() {
        const categories = this.props.categories;
        console.log('props cate', categories);
        return (
            <Form>
                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <FormGroup check>
                    <Label check>
                        <Input onClick={this.onChangeCheckbox}
                               type="checkbox"
                               value={category.id} />
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