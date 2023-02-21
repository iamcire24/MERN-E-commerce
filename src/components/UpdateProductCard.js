import {useState, useEffect } from "react";
import { Button, Container, Form} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import Swal from'sweetalert2';

export default function UpdateProductCard() {
  const {productId} = useParams();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const getProduct = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setName(data.name)
      setCode(data.code)
      setDescription(data.description)
      setPrice(data.price)
      setQuantity(data.quantity)
    }) 
  }
  useEffect(() => {
    getProduct();
  }, []);
  
  const updateProduct = async (e) => {
    e.preventDefault();
    getProduct()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products/updateProduct/${productId}`, {
      method: 'PATCH',
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
    if (res.status === 200){
      Swal.fire({
        title: "Successfully Updated Product",
        icon: "success",
        text: `Product ${name} has been updated!`
      });
    } else {
      Swal.fire({
        title: "Update Failed",
        icon: "error",
        text: "Check all the fields"
      });
    }
  }
  
  
  return (
    <Container fluid className='w-50 pt-5 me-auto bg-info mt-1'>
    <Form onSubmit={e => updateProduct(e)} className="vh-100">
    {<center><h1>Update Product </h1></center> }
    {<center><h5>Please fill in the information below </h5></center> }
    <Form.Group controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="New name"
    value = {name}
    onChange = {e => setName(e.target.value)} 
    /> 
    </Form.Group>
    <Form.Group controlId="code">
    <Form.Label>Code</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="New code"
    value = {code}
    onChange = {e => setCode(e.target.value)} 
    /> 
    </Form.Group>
    <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control 
    as="textarea"
    rows={5}
    type="text" 
    placeholder="New description"
    value = {description}
    onChange = {e => setDescription(e.target.value)} 
    /> 
    </Form.Group>
    <Form.Group controlId="quantity">
    <Form.Label>Quantity</Form.Label>
    <Form.Control 
    type="number" 
    placeholder="New Quantity"
    value = {quantity}
    onChange = {e => setQuantity(e.target.value)} 
    />
    </Form.Group>
    <Form.Group controlId="price">
    <Form.Label>Price</Form.Label>
    <Form.Control 
    type="number" 
    placeholder="New Price"
    value = {price}
    onChange = {e => setPrice(e.target.value)}
    /> 
    </Form.Group>
    
    <Button className='mt-1 w-100' variant='outline-secondary' type="submit" id="submitBtn">
    Submit
    </Button>    
    </Form>
    </Container>
    

    )
  }