import { Form, Button, Container, Nav } from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {
    const {user} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [username, setUserName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
    const navigate = useNavigate()
 
    const [isActive, setIsActive] = useState(false);

    function registerUser() {
		
		fetch(`${process.env.REACT_APP_API_URL}/users/signUp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				username: username,
				mobileNo: mobileNo,
				password: password1,
                address: address
			})
		})
        .then(res => res.json())
		.then(data => {
			console.log(data);
			if(data){
				Swal.fire({
					title: "Registration successful",
					icon: "success",
					text: "Welcome to AniManga"              
				})
				setFirstName('');
				setLastName('');
				setEmail('');
				setPassword1('');
				setPassword2('');
				setMobileNo('');
				setIsActive(false);
				navigate("/login")
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})

			}
        })

    }
    const emailExist = (e) => {
		e.preventDefault()
		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email})
		})
		.then(res => res.json())
		.then(data => {
			if (data === true){
				Swal.fire({
				title: "Email and/or Username exist!",
				icon: "error",
				text: "Please provide a different email/username!"
			})

			} else {
				registerUser();
			}
		})
	}
    useEffect(() => {
		if((email !== '' && password1 !== '' && password2 !== '' && lastName !=='' && firstName !== '') && ( password1 === password2) && (mobileNo.length >= 11) ){
			setIsActive(true);
		}
		

	}, [lastName, firstName ,email, password1, password2, mobileNo])    

    

    return (
        (user.id !== null) ?
        <Navigate to ="/login"/>
        :

        <Container fluid className='w-50 pt-5 me-auto bg-primary mt-1'>
        <Form onSubmit={emailExist}>
        {<center><h1>Create Account for AniManga </h1></center> }
        {<center><h5>Please fill in the information below </h5></center> }
        <Form.Group controlId="userFirstName">
		<Form.Label>First Name</Form.Label>
		<Form.Control 
		type="text" 
		placeholder="Enter First Name"
		value = {firstName}
		onChange = {e => setFirstName(e.target.value)} 
		required
		/> 
		</Form.Group>
		<Form.Group controlId="userLastName">
		<Form.Label>Last Name</Form.Label>
		<Form.Control 
		type="text" 
		placeholder="Enter Last Name"
		value = {lastName}
		onChange = {e => setLastName(e.target.value)} 
		required
		/> 
		</Form.Group>
        <Form.Group controlId="username">
		<Form.Label>Username</Form.Label>
		<Form.Control 
		type="text" 
		placeholder="Enter Username"
		value = {username}
		onChange = {e => setUserName(e.target.value)} 
		required
		/> 
		</Form.Group>
		<Form.Group controlId="userEmail">
		<Form.Label>Email address</Form.Label>
		<Form.Control 
		type="email" 
		placeholder="Enter email"
		value = {email}
		onChange = {e => setEmail(e.target.value)} 
		required
		/>
		</Form.Group>
		<Form.Group controlId="mobileNo">
		<Form.Label>Mobile Number</Form.Label>
		<Form.Control 
		type="text" 
		placeholder="Enter Mobile Number"
		value = {mobileNo}
		onChange = {e => setMobileNo(e.target.value)} 
		required
		/> 
		</Form.Group>
        <Form.Group controlId="address">
		<Form.Label>Address</Form.Label>
		<Form.Control 
		type="text" 
		placeholder="Enter Address"
		value = {address}
		onChange = {e => setAddress(e.target.value)} 
		required
		/> 
		</Form.Group>

		<Form.Group controlId="password1">
		<Form.Label>Password</Form.Label>
		<Form.Control 
		type="password" 
		placeholder="Password"
		value = {password1}
		onChange = {e => setPassword1(e.target.value)}
		required
		/>
		</Form.Group>

		<Form.Group controlId="password2">
		<Form.Label>Verify Password</Form.Label>
		<Form.Control 
		type="password" 
		placeholder="Verify Password" 
		value = {password2}
		onChange = {e => setPassword2(e.target.value)}
		required
		/>
		</Form.Group>
		{ isActive ?
		<Button className='mt-1 w-100' variant='outline-secondary' type="submit" id="submitBtn" >
		Submit
		</Button>
		:
		<Button className='mt-1 w-100' variant='outline-secondary' disabled type="submit" id="submitBtn">
		Submit
		</Button>


	}


	</Form>
        </Container>
    
        )
        
    }