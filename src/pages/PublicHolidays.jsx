
import React, { useState, useContext, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { usePublicHoliday } from "../customHook/customHook";
import { url } from '../components/URL/Url';
import api from '../api/api';



const initialData =
{
  date: "",
  description: ""

};

const PublicHoliday = () => {
  const { publicHoliday, loadingFetchPublicHoliday, getPublicHolidayFunc } = usePublicHoliday()
  const [show, setShow] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);

  const [formData, setFormData] = useState(initialData); // Form data state
  const [err, setErr] = useState("")
  const [editFormData, setEditFormData] = useState({})

  // Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle form input changes
  const handleChange = (e) => { 
    console.log("e.target.value date", e.target.value);
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditChange = (e) => { 
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }; 
  const handleOpenEditModelFunc = (value)=>{
    setErr('')
    const date = new Date(value.date).toISOString().split("T")[0]; 
    setEditFormData({...value, date})
    setShowEditModel(true)
  } 
  const handleCloseEditModelFunc = ()=>{
    setErr('')
    setShowEditModel(false)
    setEditFormData({})
  } 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr()
    try {
      if (formData.date.length <= 0 || formData.description.length <= 0) {
        setErr("All field are required")
        return
      }
      const res = await api.post(`/public-holiday/create`, formData);
      if (res.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "public holiday added successfully",
          showConfirmButton: false,
          timer: 1500
        })
      }
      getPublicHolidayFunc()
      setFormData(initialData);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }; 
  const handleSubmitEditForm = async (e) => {
    e.preventDefault(); 
    setErr("") 
    try {
      if (!editFormData.date || !editFormData.description) {
        setErr("All field are required")
        return
      }
      const res = await api.put(`/public-holiday/update/${editFormData._id}`, editFormData);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "public holiday updated successfully",
          showConfirmButton: false,
          timer: 1500
        })
      }
      getPublicHolidayFunc()
      setEditFormData({});
      handleCloseEditModelFunc();
    } catch (error) {
      console.error(error);
    }
  }; 
  // Handle delete category
  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) { 
        try {
          const res = await api.delete(`/public-holiday/remove/${id}`);
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "public holiday removed successfully",
              showConfirmButton: false,
              timer: 1500
            })
            getPublicHolidayFunc()
          }
        } catch (error) {
          console.error(error);
        }

      }
    });
  }; 
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
        <h5>Public Holidays</h5>
        <Button
          style={{ backgroundColor: 'rgb(202 77 77)', border: 'none' }}
          className="text-white"
          onClick={handleShow}
        >
          <i className="fas fa-layer-group"></i> Add New Holiday
        </Button>
      </div>
      <div className="table-responsive type-table-wrapper">

        <table className="table table-striped table-bordered shadow-sm">
          <thead className="text-center">
            <tr> 
              <th>Date</th>
              <th>Reason</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {publicHoliday && publicHoliday.length > 0 ? (
              publicHoliday.map((value, i) => (
                <tr key={value._id}> 
                  <td> {(new Date(value.date)).toLocaleDateString("en-GB")}</td>
                  <td> {value.description}</td>
                  <td>
                    <span onClick={()=>handleOpenEditModelFunc(value)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </span>

                  </td> 
                  <td>
                    <Link onClick={(e) => handleDelete(e, value._id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Public Holidays
                </td>
              </tr>
            )}
          </tbody>
        </table> 
      </div>

      {/* Edit Category Modal */}
      <Modal size="md" show={showEditModel} onHide={handleCloseEditModelFunc}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEditForm}> 
            <p className='text-danger'>{err}</p>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editFormData.date}
                onChange={handleEditChange}
                autoFocus
                className='mb-3'
                required
              />
              <Form.Label>Holiday Reason</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                autoFocus
                required
              />
            </Form.Group> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitEditForm}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Add Category Modal */}
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <p className='text-danger'>{err}</p>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                autoFocus
                className='mb-3'
                required
              />
              <Form.Label>Holiday Reason</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                autoFocus
                required
              />
            </Form.Group>




          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PublicHoliday;

