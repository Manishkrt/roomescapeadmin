import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import apiUrls from '../apiConfig.json'; 
import { url } from '../URL/Url';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try { 
      const res = await api.post("/admin/login", { email, password }); 
      setEmail('');
      setPassword('');

      if (res.data.requires2FA) {
        console.log("res.data.requires2FA", res.data.otp); 
        localStorage.setItem("email", email)
        navigate('/verify-otp')
        return
      } 
      navigate('/')
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Login successful!',
      //   icon: 'success',
      //   confirmButtonText: 'Okay',
      // }) 
    } catch (error) {
      // Show error alert
      console.log("error", error);
      
      Swal.fire({
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Login failed!',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
    finally {
      setLoading(false); // Loader Stop
  }
  };

 


  return (
    <>
      {/* <div className="wrapper-login box-shadow-common">
        <div className="loginbox">
        
          <div className='text-center'>
            <img src="/assets/img/escapelogo.webp" style={{ width: '100px', }} />
          </div>

          
          <form onSubmit={handleLogin} className='form-wrapper-login'>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email ID"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            <input type="submit" value="Login" />
          
          </form>
        </div>
      </div> */}


<div className="login-container">
  <video autoPlay loop muted className="bg-video hero-video">
    <source src="/videos/blood.mp4" type="video/mp4" />
  </video>

  <div className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
    <div className="card shadow-lg p-4 border-0 text-white" style={{ width: '400px', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="text-center">
        <img src="/assets/img/escapelogo.webp" style={{ width: '80px' }} alt="Logo" />
        <h3 className="mt-3 text-white">Ad<span className='text-warning'>min</span> Login</h3>
      </div>

      <form onSubmit={handleLogin} className="mt-4">
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2"
          />
        </Form.Group>
<div className="text-end">
<button type="submit" className="btn btn-light  py-2 fw-bold shadow-sm bg-escape text-white"disabled={loading} style={{padding:'10px 25px',borderRadius:"30px"}}>
{loading ? (
        <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Logging in...
        </>
    ) : "Login"}
        </button>
</div>
       

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none text-light">Welcome  <span className='text-warning'>Back !</span> </a>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
