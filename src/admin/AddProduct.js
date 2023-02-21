import { Form, Button, Container } from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function AddProduct() {
    const {user} = useContext(UserContext);
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    
    
    const [isActive, setIsActive] = useState(false);
    
    function addProduct(e) {
        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_API_URL}/products/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                code: code,
                description: description,
                quantity: quantity,
                price: price
            })
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data){
                Swal.fire({
                    title: "Product added",
                    icon: "success",
                    text: "Successfully added Manga"             
                })
                setName('');
                setCode('');
                setDescription('');
                setQuantity('');
                setPrice('');
                
                //navigate("/login")
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again"
                })
                
            }
        })
        
    }
    
    useEffect(() => {
        if(name !== '' && code !== '' && description !== '' && quantity !=='' && price !== ''){
            setIsActive(true);
        }
        
        
    }, [name, code, description, quantity, price])    
    
    
    
    return (
        <Container fluid className='w-50 pt-5 me-auto bg-info mt-1'>
        <Form onSubmit={addProduct}>
        {<center><h1>Add Manga for AniManga </h1></center> }
        {<center><h5>Please fill in the information below </h5></center> }
        <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Manga Name"
        value = {name}
        onChange = {e => setName(e.target.value)} 
        required
        /> 
        </Form.Group>
        <Form.Group controlId="code">
        <Form.Label>Code</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter ISBN Code"
        value = {code}
        onChange = {e => setCode(e.target.value)} 
        required
        /> 
        </Form.Group>
        <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
        as="textarea"
        rows={5} 
        type="text" 
        placeholder="Enter Manga Description"
        value = {description}
        onChange = {e => setDescription(e.target.value)} 
        required
        /> 
        </Form.Group>
        <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Enter Manga Quantity"
        value = {quantity}
        onChange = {e => setQuantity(e.target.value)} 
        required
        />
        </Form.Group>
        <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Enter Manga Price"
        value = {price}
        onChange = {e => setPrice(e.target.value)} 
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