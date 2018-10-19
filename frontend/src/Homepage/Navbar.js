import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
      return (
          <div>
              <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">Demo Restaurant App</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem active={true}>
                              <NavLink href='' >Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/components/">Products</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="https://github.com/reactstrap/reactstrap">Order Table</NavLink>
                          </NavItem>
                          <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                  Settings
                              </DropdownToggle>
                              <DropdownMenu right>
                                  <DropdownItem>
                                      Option 1
                                  </DropdownItem>
                                  <DropdownItem>
                                      Option 2
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                      Reset
                                  </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </Nav>
                  </Collapse>
              </Navbar>
          </div>
      );
  }
}

export default MyNavbar;