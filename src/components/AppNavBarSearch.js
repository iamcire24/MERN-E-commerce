import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import { Cart4 } from 'react-bootstrap-icons';
import UserContext from '../UserContext';
import {useState, useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../App.css'

export default function AppNavBarSearch() {
  const {user} = useContext(UserContext);
  return (
    <Navbar id="nav-bar" expand="lg">
    <Container fluid>
    <Navbar.Brand as={NavLink} to="/">AniManga</Navbar.Brand>
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
    <Button variant="outline-light">Search</Button>
    </Form>
    <Nav className='ml-auto p-2'>
    
    {
      (user.id) ? 
      <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
      :
      <>
      <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
      <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      </>
    }
    
    </Nav>{
      (user.isAdmin) ? 
      <>
      </>
      :
      <Nav.Link as={NavLink} to="/"> <Cart4 size={50}/></Nav.Link>
    }
    
    
    </Navbar.Collapse>
    </Container>
    </Navbar>
    );
  }
  