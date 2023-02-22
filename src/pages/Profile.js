import { Button, Container, Card, Row, Col, Table} from "react-bootstrap";
import {useState, useEffect } from "react";
import '../App.css'
export default function Profile(){
    const [user, setUser] = useState({});
    const [order, setOrder] = useState([]);
    const getUser = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
          setUser(data)
        }) 
      }
      useEffect(() => {
        getUser();
      });
      const getOrder = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/order/myOrders`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(res => res.json())
      .then(data => {
        setOrder(data)
      }) 
      }
      useEffect(() => {
        getOrder();
      });



    return (
      <>
        <Container  className=' pt-5 mt-1 '>
    
		<Card  id="card-new" >
            <Card.Body className="text-center ">
            <Card.Title id="card-title" >{user.username}</Card.Title>
            </Card.Body>
            {/* <Card.Img className='h-20' variant="top" src="" /> */}
            <Card.Body className="h-70">
            <Card.Subtitle id="subtitle">Full Name:</Card.Subtitle>
            <Card.Text >{user.firstName} {user.lastName}</Card.Text>
            </Card.Body>
            <Card.Body className="h-70">
            <Card.Subtitle id="subtitle" >Email: </Card.Subtitle>
            <Card.Text >{user.email}</Card.Text>
            </Card.Body>
            <Card.Body className="h-70">
            <Card.Subtitle id="subtitle" >Mobile Number: </Card.Subtitle>
            <Card.Text > {user.mobileNo}</Card.Text>
            </Card.Body>
            <Card.Body className="h-70">
            <Card.Subtitle id="subtitle" >Address: </Card.Subtitle>
            <Card.Text >{user.address}</Card.Text>
            </Card.Body>
            </Card>
            
    </Container>
<Container>
  <center><h3>Purchased History</h3></center>
		
            <Table striped bordered hover size="sm">
           
        <tbody id ="table-purchase">
        
        <tr>
        <th>Purchased On</th>
        <th>Total Amount</th>
        
        
        </tr>
        
        {order.map((item, index) => (
            <tr key={index}>
            <td>{item.purchasedOn}</td>
            <td>{item.totalAmount}</td>
            
            
            
            </tr>
            ))}
            </tbody>
            </Table>
    
		
    </Container>
    </>
    
    )
}