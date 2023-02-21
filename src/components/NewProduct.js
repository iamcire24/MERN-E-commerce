import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useState, useEffect} from 'react'
import { Card, Button, Container } from 'react-bootstrap';
import '../App.css'

export default function NewProduct(){
const [data, setData] = useState([]);
let php = "\u20B1"
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const getNewProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/allNew`)
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
    getNewProduct();
});

return (
    
  <Container className='vh-100'>
    <h1>New Products</h1>
<Carousel responsive={responsive}
autoPlay
autoPlaySpeed={2000}
infinite>
{data.map((item, index) => (
            <Card key={index} id="card-new" className="h-100 ">
            <Card.Body className="text-center ">
            <Card.Title id="card-title" >{item.name}</Card.Title>
            </Card.Body>
            {/* <Card.Img className='h-20' variant="top" src="" /> */}
            <Card.Body className="text-center h-50">
            <Card.Subtitle id="subtitle">Description:</Card.Subtitle>
            <Card.Text >{item.description}</Card.Text>
            </Card.Body>
            
            <Card.Subtitle id="subtitle" >Price: </Card.Subtitle>
            <Card.Text>{php} {item.price}</Card.Text>
            
    
                                {/* {
                                    (user.id !== null) ?
                                        <Button variant="primary" onClick={() => enroll(courseId)} >Enroll</Button>
                                        :
                                        <Button className="btn btn-danger" as={Link} to="/login"  >Log in to Enroll</Button>
                                } */}
                                
    
            
            <Button variant="info" onClick={() => window.open(`/products/${item._id}`, '_blank')}>View</Button>
            </Card>
            ))}


  


</Carousel>
</Container>
)
}