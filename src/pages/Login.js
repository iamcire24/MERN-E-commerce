import { Form, Button, Container, Nav } from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login() {
    const {user, setUser} = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const [isActive, setIsActive] = useState(false);

    function loginUser(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
        .then(res => res.json())
		.then(data => {
			console.log(data);
            if(typeof data.access !== "undefined"){
                // The JWT will be used to retrieve user information accross the whole frontend application and storing it in the localStorage
                    localStorage.setItem('token', data.access)
                    console.log(data.access)
                    retrieveUserDetails(data.access);
                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to AniManga!"
                    })
                } else {
                    Swal.fire({
                        title: "Authentication Failed",
                        icon: "error",
                        text: "Please, check your login details and try again."
                    })
                }
            })

        setEmail('');
		setPassword('');
    }
    const retrieveUserDetails = (token) =>{
		fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}
    
    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        }
    }, [email, password])
    return (
        (user.id !== null) ?
        <Navigate to ="/register"/>
        :
        <Container fluid className='w-50 pt-5 me-auto bg-primary mt-5'>
        <Form onSubmit={(e) => loginUser(e)}>
        <Form.Group controlId="userEmail">
        {<center><h1>Login to AniManga </h1></center> }
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        value = {email}
        onChange = {e => setEmail(e.target.value)} 
        required
        />
        
        </Form.Group>
        
        <Form.Group controlId="password1">
        
        <Form.Control 
        className='mt-1'
        type="password" 
        placeholder="Password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        required
        />
        </Form.Group>
        
        { isActive ?

            <Button className='mt-1 w-100' variant='outline-secondary' type="submit" id="loginBtn" >
            Login
            </Button>
            :
            <Button className='mt-1 w-100' variant='outline-secondary' disabled type="submit" id="loginBtn">
            Login
            </Button>
            
            
        }
        <Form.Group>
        <Form.Label id= "newCustomer">New customer?<Nav.Link id="registerHere" href="#home">Register here</Nav.Link></Form.Label>  
        </Form.Group>
        
        </Form>
        </Container>
    
        )
        
    }