import {useState, useEffect} from 'react';
import {Button, Container, Table, Pagination} from 'react-bootstrap';

import Swal from 'sweetalert2'



export default function ManageUser(){
    
    //const navigate = useNavigate()
    const [data, setData] = useState([]);
    function refreshPage() {
        window.location.reload(false);
      }
    

    
    const toAdmin = (e) => {
        const adminUser  = e.target.value;
        fetch(`${process.env.REACT_APP_API_URL}/users/${adminUser}/admin`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: result.message
                })
                
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: result.message
                })
            }
        })
        refreshPage() 
       
        
    }
    const toUser = (e) => {
        const userAdmin  = e.target.value;
        fetch(`${process.env.REACT_APP_API_URL}/users/${userAdmin}/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: result.message
                })
                
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: result.message
                })
            }
        })
       
        refreshPage() 
    }
    
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/allUsers`)
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
        fetchData();
    });
    
    
    return (
        <Container>
        <center><h2>Admin Dashboard</h2></center>
        <Button className="btn btn-success mx-2 my-3" onClick={() => window.open('/admin/addProduct', '_self')}>Add Product</Button>
        <Button className="btn btn-success mx-2 my-3" onClick={() => window.open('/admin', '_self')}>Manage Product</Button>
        <div>
        <Pagination>
        <Table striped bordered hover size="sm">
        <tbody id ="table-product">
        <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Mobile Number</th>
        <th>Address</th>
        <th>Date Registered</th>
        <th>Role</th>
        </tr>
        {data.map((user, index) => (
            <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobileNo}</td>
            <td>{user.address}</td>
            <td>{user.dateRegistered}</td>
            <td>
            {
                (user.isAdmin === true) ?
                <Button value={user._id}  onClick={toUser} variant="danger"  style={{ fontSize:'12px', paddingY:'0',paddingX:'auto', textAlign:'center', display:'flex',justifyContent:'center'}}>Admin</Button>
                :
                <Button value={user._id} onClick={toAdmin} variant="primary"  style={{ fontSize:'12px', paddingY:'0',paddingX:'auto', textAlign:'center', display:'flex',justifyContent:'center'}} >User</Button>
            }
            </td>

        
            </tr>
            ))}
            </tbody>
            </Table>
            </Pagination>
            </div>
            
            

            
            
            </Container>
            )
        }
    