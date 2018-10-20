import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Filters extends React.Component {

    render() {
        const categories = this.props.categories;

        return (
            <Form>
                <h4>Filters</h4>
                {categories.map((category, index)=>(
                    <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />{' '}
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