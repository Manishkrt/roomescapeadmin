import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { url } from '../URL/Url';
const intialdata = {
    name :'',
    Discription : ''
}
const CategoryEdit = () => {
    const navigate = useNavigate()
    const [data, SetData]=useState(intialdata)
    const {id} = useParams();

    const getSingleDepartment = async()=>{
        try {
            const res = await axios.get(`${url}/singleCategory/${id}`)
            if(res.status == 200){
                SetData(res.data.singleCategory)
            }
        } catch (error) {
            
        }
    }

const Handlechange = (e)=>{
    SetData({...data, [e.target.name]:e.target.value})
}


    console.log("data",data);
    useEffect(()=>{
        getSingleDepartment()
    },[])

    const HandleSumbit = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/CategoryUpdate/${id}`,data)
            if(res.status == 200){
Swal.fire({
    text : 'success',
    icon : 'success',
    confirmButtonText: "OK"
})
navigate('/Category')
      SetData(" ")
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
  <>
  
  <Link to='/Category'><i className="fa-solid fa-arrow-left"></i> Back</Link>
<Form className='py-5'>
            <div className="row p-5">
              <div className="col-md-12 mb-3">
                <Form.Group controlId="formFirstName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control type="text" name="name" value={data.name} autoFocus  onChange={(e)=>Handlechange(e)} />
                </Form.Group>
              </div>
             
              <div className="col-md-12">
              <Button variant="primary" onClick={(e)=>HandleSumbit(e)}>
           Edit
          </Button>
              </div>
            </div>
       
          </Form>
  </>
  )
}

export default CategoryEdit