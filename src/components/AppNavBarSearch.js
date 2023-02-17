import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import { Cart4 } from 'react-bootstrap-icons';
import UserContext from '../UserContext';
import {useState, useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function AppNavBarSearch() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">AniManga</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>

          <Form className="d-flex w-50 me-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 w-100"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className='ml-auto p-2'>
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
          </Nav>
          <Nav.Link href="#home"><Cart4 size={50}/></Nav.Link>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
