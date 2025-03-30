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
// import { useCoupon, usePublicHoliday } from "../customHook/customHook";
import { url } from '../../components/URL/Url';
import api from '../../api/api';
import { useCoupon, useGame } from '../../customHook/customHook';



const initialData = {
    coupon: "",
    discountType: "",
    discount: "",
    totalCoupon: "",
    game : "",
    name : "",
    rating : "",
    message : ""

};

const GameReview = () => {
    const { coupon, getCouponFunc } = useCoupon()
    const { game } = useGame()

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

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

    const fetchGameReview = async()=>{
        setLoading(true)
        try {
            // const response = await api.get('/game-review/all')
            // console.log("response", response);
            // setReviews(response.data.reviews)
            const reviewsByGame = await api.get('/game-review/game-wise')
            console.log("reviewsByGame", reviewsByGame);
            setReviews(reviewsByGame.data)
            
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchGameReview()
    },[])
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr()
        try {
            if (!formData.game || !formData.name || !formData.rating || !formData.message) {
                setErr("All field are required")
                return
            }
            console.log(formData);
            
            const res = await api.post(`/game-review/add`, formData);
            if (res.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Added new Coupon successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            // getCouponFunc()
            fetchGameReview()
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
            if (!editFormData.discountType || !editFormData.coupon || !editFormData.discount) {
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
                    const res = await api.delete(`/game-review/${id}`);
                    if (res.status === 200) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "review removed successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // getCouponFunc()
                        fetchGameReview()
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
                <h5>Game Review</h5>
                <Button

                    className="text-white bg-escape"
                    onClick={handleShow}
                >
                    <i className="fa-solid fa-ticket-simple"></i>&nbsp; Add Game Review
                </Button>
            </div>
            <div className="container mt-4">
                {loading ? 
                <div className='py-5 text-center'>Loading...</div> :
                reviews.length > 0 ?
                reviews.map((game, index)=>(
                    <div key={game.gameId}>
                        <h3 className='text-capitalize'>{game.game}</h3>
                        <div class="row">
                            {game?.reviews.map((value)=>(
                                 <div key={value._id} className="col-lg-4 col-md-4 col-sm-6 mb-3">
                                 <div
                                     className="card shadow-sm text-center"
                                     style={{
                                         background: "white",
                                         borderRadius: "15px",
                                         transition: "0.3s",
                                         color: "#fff",
                                         boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                                         cursor: "pointer",
                                         border: "1px dashed #ED2224"
 
                                     }}
                                 >
                                     <div className="card-body">
                                         <h5 className="fw-bold text-dark">
                                             {/* <i className="fa-solid fa-ticket-alt"></i>  */}
                                             {value.name}
                                         </h5>
                                         <p className="fw-semibold text-dark">
                                             Rating:{value.rating} 
                                         </p> 
                                         <p className='text-secondary'>{value.message}</p> 
                                         <div className="d-flex justify-content-center gap-2 mt-3">
                                             <button
                                                 className="btn border-dark  text-dark shadow-sm px-3 py-1 rounded-pill fw-bold"
                                                 onClick={() => handleOpenEditModelFunc(value)}
                                                 style={{
                                                     color: "white", 
                                                 }}
                                             >
                                                 <i className="fa-regular fa-pen-to-square text-dark"></i> Edit
                                             </button>
                                             <button
                                                 className="btn border-dark text-dark shadow-sm px-3 py-1 rounded-2 fw-bold"
                                                 onClick={(e) => handleDelete(e, value._id)}
                                             >
                                                 <i className="fa-solid fa-trash-can text-dark"></i> Delete
                                             </button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                            ))}

                        </div>
                    </div>
                )) :
                <div className='text-center py-5'>No Review Found</div> } 
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
                    <Modal.Title>Add Game Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <p className='text-danger'>{err}</p>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Game <span className='text-danger'>*</span></Form.Label>
                            <Form.Select name="game" className='mb-3 border-dark' value={formData.game} onChange={handleChange} required>
                                <option value="">Choose one</option>
                                {game.map(value => (
                                    <option value={value._id} key={value._id}>{value.name}</option>
                                ))}
                                {/* <option value="percentage">Percentage</option> */}
                            </Form.Select>


                            <Form.Label>Name <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter customer name'
                                className='mb-3'
                                required
                            />
                            <Form.Label>Rating <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter rating'
                                className='mb-3'
                                min={1}
                                max={5}
                                required
                            />

                            <Form.Label>Message <span className='text-danger'>*</span></Form.Label>
                            {/* <textarea name="message" id=""></textarea> */}
                            <textarea
                                type="number"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                autoFocus
                                placeholder='enter review message'
                                className='mb-3 form-control'
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

export default GameReview;

