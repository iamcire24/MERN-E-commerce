import {useState, useEffect} from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css'

export default function ProductList() {
    const [data, setData] = useState([]);
    let php = "\u20B1"

    const getAllProduct = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/availableProducts`)
        .then(res => res.json())
        .then((actualData) => {
            console.log(actualData);
            setData(actualData)
            console.log(data);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
    useEffect(() => {
        getAllProduct();
    });
    
    return (
        <Container >
        <h1>All Products</h1> 
        <Row lg={3}>
        {data.map((item, index) => (
            <Col className='d-flex'>
                <Card className='flex-fill' id="card-new" key={index}>
                <Card.Body className="text-center ">
            <Card.Title id="card-title" >{item.name}</Card.Title>
            </Card.Body>
            {/* <Card.Img className='h-20' variant="top" src="" /> */}
            <Card.Body className="text-center h-70">
            <Card.Subtitle id="subtitle">Description:</Card.Subtitle>
            <Card.Text >{item.description}</Card.Text>
            </Card.Body>
            
            <Card.Subtitle id="subtitle" >Price: </Card.Subtitle>
            <Card.Text>{php} {item.price}</Card.Text>
            
                                
    
            
            <Button variant="info" value={item._id} onClick={() => window.open(`/products/${item._id}`, '_blank')}>View</Button>
                </Card>
            </Col>

        ))}
</Row>
</Container>
    )
}