
import React, { useState, useContext, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useTimeSlot } from "../customHook/customHook";
import { url } from '../components/URL/Url';
import api from '../api/api';




const initialData = {
    startTime: "",
};

const TimeSlot = () => {
    const { timeSlot, loadingFetchTimeSlot, getTimeSlotFunc } = useTimeSlot()
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(initialData); // Form data state


    const [showEditModel, setShowEditModel] = useState(false);
    const [editFormData, setEditFormData] = useState({})
    const [err, setErr] = useState("")

    // Modal Handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    };
    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };
    const handleOpenEditModelFunc = (value) => {
        setErr('') 
        setEditFormData(value)
        setShowEditModel(true)
    }
    const handleCloseEditModelFunc = () => {
        setErr('')
        setShowEditModel(false)
        setEditFormData({})
    }
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr()
        try {
            if (formData.startTime.length <= 0) {
                setErr("All field are required")
                return
            }
            const res = await api.post(`/time-slot/create`, formData);
            if (res.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            getTimeSlotFunc()
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
            if (!editFormData.startTime) {
                setErr("All field are required")
                return
            }
            const res = await api.put(`/time-slot/update/${editFormData._id}`, editFormData);
            if (res.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            getTimeSlotFunc()
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await api.delete(`/time-slot/remove/${id}`);
                    if (res.status === 200) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Removed successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getTimeSlotFunc()
                    }
                } catch (error) {
                    console.error(error);
                }

            }
        });
    };


    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours, minutes);

        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };



    return (
        <>
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Time Slot</h5>
                <Button
                    
                    className="text-white bg-escape"
                    onClick={handleShow}
                >
                     <i className="fa-solid fa-clock"></i> Add New Timing
                </Button>
            </div>
            {/* <div className="table-responsive type-table-wrapper">

                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="text-center">
                        <tr>
                            <th>Timing</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {timeSlot && timeSlot.length > 0 ? (
                            timeSlot.map((value, i) => (
                                <tr key={value._id}>
                                    <td> {convertTo12HourFormat(value.startTime)}</td>
                                    <td>
                                        <span onClick={()=>{handleOpenEditModelFunc(value)}}>
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
                                    No Data Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

               

            </div> */}
<div className="container mt-4">
    <h4 className="fw-bold mb-3">Time Slots</h4>
    <div className="row">
        {timeSlot && timeSlot.length > 0 ? (
            timeSlot.map((value) => (
                <div key={value._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                    <div 
                        className="card p-3 shadow-sm  text-center"
                        style={{
                            background: "#fff",
                            borderRadius: "12px",
                            transition: "0.3s ease-in-out",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            border: "1px dashed #ED2224"
                        }}
                    >
                        <div className="card-body">
                            <h5 className="text-dark">
                                <i className="fa-solid fa-stopwatch text-danger me-2"></i>
                                {convertTo12HourFormat(value.startTime)}
                            </h5>
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <button 
                                    className="btn border-dark text-white px-4 py-2 rounded-pill"
                                    onClick={() => handleOpenEditModelFunc(value)}
                                >
                                    <i className="fa-regular fa-pen-to-square text-dark "></i>
                                </button>
                                <button 
                                    className="btn btn-outline-danger px-4 py-2 rounded-pill"
                                    onClick={(e) => handleDelete(e, value._id)}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-12 text-center">
                <p className="alert alert-warning">No Time Slots Available</p>
            </div>
        )}
    </div>
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
                            <Form.Label>Time</Form.Label>

                            <Form.Control
                                type="time"
                                name="startTime"
                                value={editFormData.startTime}
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
                    <Modal.Title>Add New Timing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Time</Form.Label>

                            <Form.Control
                                type="time"
                                name="startTime"
                                value={formData.startTime}
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

export default TimeSlot;

