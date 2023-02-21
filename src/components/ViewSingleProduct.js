import {useState, useEffect } from "react";
import { Button, Container, Card, Row, Col, Form} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import Swal from'sweetalert2';
import '../App.css'

export default function ViewSingleProduct() {
 const {productId} = useParams();
const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  let php = "\u20B1"
  const getProduct = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setProduct(data)
    }) 
  }
  const order = async () => {
    if(localStorage.getItem('token') !== null) {
        try {
            Swal.fire({
              title: `Are you sure you want to buy this manga?`,
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: 'No',
            }).then(async (result) => {
              if (result.isConfirmed) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/order/addOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    products: [
                        {
                            productId: productId,
                            quantity: quantity
                        }
                    ]
                })
                    })
                    if(response.status === 200) {
                        Swal.fire({
                        title: "Order Successful",
                        icon: "success",
                        text: "Thank You and have a nice day!"
                    })
                    }
              } else if (result.isDenied) {
                Swal.fire('Order Cancelled')
              }
            })
            
        } catch(error) {
            console.log(error);
        }
    } else {
        Swal.fire({
            title: "Order Denied",
            icon: "error",
            text: "Please log in first!"
        })
    }
};

  useEffect(() => {
    getProduct();
  });
  useEffect(() => {
    if(quantity === 1) {
        document.querySelector('.btn-reduce-quantity').setAttribute('disabled', true);
    } else if (quantity === product.quantity){
        document.querySelector('.btn-add-quantity').setAttribute('disabled', true);
    }  else {
        document.querySelector('.btn-reduce-quantity').removeAttribute('disabled');
    }

}, [quantity])

  
  
  
  return (
    <Container fluid className='w-100 vh-100 pt-5 me-auto  mt-1'>
    <Row>
		<Col >
		<Card className='flex-fill' id="card-new" >
                <Card.Body className="text-center ">
            <Card.Title id="card-title" >{product.name}</Card.Title>
            </Card.Body>
            {/* <Card.Img className='h-20' variant="top" src="" /> */}
            <Card.Body className="text-center h-70">
            <Card.Subtitle id="subtitle">Description:</Card.Subtitle>
            <Card.Text >{product.description}</Card.Text>
            </Card.Body>
            <Card.Subtitle id="subtitle" >Code: </Card.Subtitle>
            <Card.Text>{product.code}</Card.Text>
            <Card.Subtitle id="subtitle" >Price: </Card.Subtitle>
            <Card.Text>{php} {product.price}</Card.Text>
            <Card.Subtitle id="subtitle" >Stocks: </Card.Subtitle>
            <Card.Text>{product.quantity}</Card.Text>
            <div>
							<center> <h4>Number of Order</h4> </center>
						</div>
						<div>
                            <center>
							<Button className="btn btn-reduce-quantity" variant="danger" onClick={() => setQuantity(quantity - 1)}>-</Button>
							<span value= {quantity}>{quantity}</span>
							<Button className="btn btn-add-quantity" variant="success" onClick={() => setQuantity(quantity + 1)}>+</Button>
                            </center>
						</div>
            
    
                                {/* {
                                    (user.id !== null) ?
                                        <Button variant="primary" onClick={() => enroll(courseId)} >Enroll</Button>
                                        :
                                        <Button className="btn btn-danger" as={Link} to="/login"  >Log in to Enroll</Button>
                                } */}
                                
    
            
            <Button variant="outline-secondary" onClick={order}>Order Now</Button>
            <Button variant="outline-info">Add to Cart</Button>
                </Card>
		</Col>
		</Row>
    </Container>
    

    )
  }