
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
import { useCoupon, usePublicHoliday } from "../customHook/customHook";
import { url } from '../components/URL/Url';
import api from '../api/api';



const initialData = {
    coupon: "",
    discountType: "",
    discount: "",
    totalCoupon: ""
};

const CouponCodePage = () => {
    const { coupon, getCouponFunc } = useCoupon()
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
            if (!formData.discountType || !formData.coupon || !formData.discount ) {
                setErr("All field are required")
                return
            }
            const res = await api.post(`/coupon/create`, formData);
            if (res.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Added new Coupon successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            getCouponFunc()
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
            if (  !editFormData.discountType || !editFormData.coupon || !editFormData.discount  ) {
                setErr("All field are required")
                return
            }
            const res = await api.put(`/coupon/update/${editFormData._id}`, editFormData);
            if (res.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Updated coupon successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            getCouponFunc()
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
                    const res = await api.delete(`/coupon/remove/${id}`);
                    if (res.status === 200) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Coupon removed successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getCouponFunc()
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
                <h5>Coupon Code</h5>
                <Button
                    style={{ backgroundColor: 'rgb(202 77 77)', border: 'none' }}
                    className="text-white"
                    onClick={handleShow}
                >
                    <i className="fas fa-layer-group"></i> Add New Coupon
                </Button>
            </div>
            <div className="table-responsive type-table-wrapper">

                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="text-center">
                        <tr>
                            <th>Coupon Name</th>
                            <th>Discount Type</th>
                            <th>Discount</th> 
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {coupon && coupon.length > 0 ? (
                            coupon.map((value, i) => (
                                <tr key={value._id}>
                                    <td> {value.coupon}</td>
                                    <td> {value.discountType} </td>
                                    <td> {value.discount == "percentage" ? <>{value.discount} &#37; </> : <>&#8377;  {value.discount}</>} </td>
                                     
                                    <td> {value.status ? "Active" : "Inactive"} </td>
                                    <td>
                                        <span onClick={() => handleOpenEditModelFunc(value)} className='me-3'>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span onClick={(e) => handleDelete(e, value._id)}>
                                            <i className="fa-solid fa-trash-can text-danger fs-6"></i>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No Coupon
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Category Modal */}
            <Modal size="md" show={showEditModel} onHide={handleCloseEditModelFunc}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEditForm}>
                        <p className='text-danger'>{err}</p>
                        <Form.Group controlId="formCategoryName">

                            <Form.Label>Coupon Code <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="coupon"
                                value={editFormData.coupon}
                                onChange={handleEditChange}
                                autoFocus
                                placeholder='enter your coupon code'
                                className='mb-3'
                                required
                            />

                            <Form.Label>Discount Type <span className='text-danger'>*</span></Form.Label>
                            <Form.Select name="discountType" className='mb-3 border-dark' value={editFormData.discountType} onChange={handleEditChange}>
                                <option value="">Choose one</option>
                                <option value="flat">Flat Discount</option>
                                <option value="percentage">Percentage</option>
                            </Form.Select>
                            <Form.Label>Discount <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="discount"
                                value={editFormData.discount}
                                onChange={handleEditChange}
                                autoFocus
                                placeholder='enter your Discount'
                                className='mb-3'
                                required
                            />

                            {/* <Form.Label>Total Coupon <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="totalCoupon"
                                value={editFormData.totalCoupon}
                                onChange={handleEditChange}
                                autoFocus
                                placeholder='enter total coupon'
                                className='mb-3'
                                required
                            /> */}
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
                    <Modal.Title>Generate New Coupon Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <p className='text-danger'>{err}</p>
                        <Form.Group controlId="formCategoryName">


                            <Form.Label>Coupon Code <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="coupon"
                                value={formData.coupon}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter your coupon code'
                                className='mb-3'
                                required
                            />
                            <Form.Label>Discount Type <span className='text-danger'>*</span></Form.Label>
                            <Form.Select name="discountType" className='mb-3 border-dark' value={formData.discountType} onChange={handleChange}>
                                <option value="">Choose one</option>
                                <option value="flat">Flat Discount</option>
                                <option value="percentage">Percentage</option>
                            </Form.Select>
                            <Form.Label>Discount <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter your Discount'
                                className='mb-3'
                                required
                            />

                            {/* <Form.Label>Total Coupon <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="totalCoupon"
                                value={formData.totalCoupon}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter total coupon'
                                className='mb-3'
                                required
                            /> */}
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

export default CouponCodePage;

