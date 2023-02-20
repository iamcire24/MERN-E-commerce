import {useState, useEffect} from 'react';
import {Button, Card, Container, Modal, Row, Table, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'



export default function ManageProduct(){
    
    //const navigate = useNavigate()
    const [data, setData] = useState([]);
    function refreshPage() {
        window.location.reload(false);
      }
    
    const archiveProduct = (e) => {
        const archiveItem  = e.target.value;
        fetch(`${process.env.REACT_APP_API_URL}/products/${archiveItem}/archive`, {
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
        refreshPage();
        
    }
    const unarchiveProduct = (e) => {
        const unarchiveItem  = e.target.value;
        fetch(`${process.env.REACT_APP_API_URL}/products/${unarchiveItem}/unarchive`, {
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
        refreshPage();
        
    }
    // const addProduct = () => {
    //     navigate('/admin/addProduct')
    // }
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/all`)
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
    }, []);
    
    
    return (
        <Container>
        <center><h2>Admin Dashboard</h2></center>
        <Button className="btn btn-success mx-2 my-3" onClick={() => window.open('/admin/addProduct', '_blank')}>Add Product</Button>
        <Button className="btn btn-success mx-2 my-3" onClick="">Manage User</Button>
        <div>
        
        
        
        <Table striped bordered hover size="sm">
        <tbody id ="table-product">
        
        <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Description</th>
        <th>Stocks</th>
        <th>Price</th>
        <th>Active</th>
        <th>Action</th>
        
        </tr>
        
        {data.map((item, index) => (
            <tr key={index}>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>
            {
                (item.isActive === true) ?
                <Button value={item._id}  onClick={archiveProduct} variant="danger"  style={{ fontSize:'12px', paddingY:'0',paddingX:'auto', textAlign:'center', display:'flex',justifyContent:'center'}}>Disable</Button>
                :
                <Button value={item._id} onClick={unarchiveProduct} variant="primary"  style={{ fontSize:'12px', paddingY:'0',paddingX:'auto', textAlign:'center', display:'flex',justifyContent:'center'}} >Enable</Button>
            }
            </td>
            <td style={{width:'10%'}}><Button className="admin-product-operation" onClick="" value={item._id} variant="secondary" style={{width:'70%', fontSize:'12px', paddingY:'0',paddingX:'auto', textAlign:'center', display:'flex',justifyContent:'center'}}>Update</Button>  
            
            </td>
            </tr>
            ))}
            </tbody>
            </Table>
            </div>
            
            
            
            
            </Container>
            )
        }