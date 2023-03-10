import './App.css';
import AppNavBarSearch from "./components/AppNavBarSearch";
import Login from "./pages/Login";
import {useState, useEffect} from 'react';
import {UserProvider} from './UserContext'
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Footer from './components/Footer';
import Home from './pages/Home';
import Logout from './pages/Logout';
import NotFound from './components/NotFound';
import ManageProduct from './admin/ManageProduct';
import AddProduct from './admin/AddProduct';
import UpdateProductCard from './components/UpdateProductCard';
import ProductList from './components/ProductList';
import ViewSingleProduct from './components/ViewSingleProduct';
import Profile from './pages/Profile';
import ManageUser from './admin/ManageUser';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    email: null,
    username: null
  });
  const unsetUser = () => {
    localStorage.clear();
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //User is logged in
      if (typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          email: data.email,
          username: data.username
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []) 
  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
    <Router>
      <AppNavBarSearch/>
        <Container>
          <Routes>
          {
            (user.isAdmin) ?
            <>
            
            <Route path='/admin' element = {<ManageProduct/>}/>
            <Route path='/admin/user' element = {<ManageUser/>}/>
            <Route path='/admin/addProduct' element = {<AddProduct/>}/>
            <Route path='/admin/updateProduct/:productId' element = {<UpdateProductCard/>}/>
            </>
            :
            <>
             <Route path='/' element = {<Home/>}/>
            <Route path='/products' element= {<ProductList/>}/>
            <Route path='/products/:productId' element = {<ViewSingleProduct/>}/>
            </>
          }

            
           
            <Route path='/profile' element = {<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Container>
        <Footer/>
    </Router>
    
    
  </UserProvider>    
    </>
    
  );
}

export default App;
