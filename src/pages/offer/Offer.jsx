import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { ClipLoader } from "react-spinners";
import api from '../../api/api';
import Swal from 'sweetalert2';

const Offer = () => {
    const [show, setShow] = useState(false); 
    const [offerBanners, setOfferBanner] = useState([])
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState()
    const [errMsg, setErrMsg] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


     

    const fileHandle = (e)=>{
        setErrMsg("")
        setImage(e.target.files[0])
    }

    const fetchBanner = async()=>{
        try {
            const response = await api.get('/offer-banner')
            if(response.status == 200){
                setOfferBanner(response.data)
            } 
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleSubmit = async () => {
        setLoading(true) 
        setErrMsg("") 
        if(!image){
            return setErrMsg("Choose an Image. Input field can not be empty")
        } 
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await api.post('/offer-banner/add', formData)
            if(response.status == 201){
                handleClose()
                setImage()
                fetchBanner()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Offer Banner Added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });

            }
        } catch (error) {
            console.log(error); 
        } finally {
            setLoading(false)
        }

    }

    const removerBanner = async (id)=>{
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
                    const response = await api.delete(`/offer-banner/${id}`)
                    console.log("response", response);
                    fetchBanner()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Offer Banner removed successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    
                } catch (error) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something went wrong",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    console.log(error); 
                } 
            }
          });  
    }

    useEffect(()=>{
        fetchBanner()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Offer</h5>
                <Button className="text-white bg-escape" onClick={handleShow}>
                    <i className="fa-solid fa-percent"></i>&nbsp;
                    Add New Offer
                </Button>
            </div>

            {/* Offer Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Offer Banner</th>
                        {/* <th>Discount</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offerBanners.map((value, index) => (
                        <tr key={value._id}>
                            <td>{index + 1}</td>
                            {/* <td>{value.imageUrl}</td>  */}
                            <td>
                                <img src={value.imageUrl} alt={value.imageUrl} width={200}/>
                            </td>
                            <td>
                                {/* <Button variant="warning" size="sm">
                                    <i className="fa-solid fa-edit"></i>
                                </Button>
                                &nbsp; */}
                                <Button variant="danger" size="sm" onClick={() => removerBanner(value._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Offer Modal */}
            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate New Coupon Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errMsg && <p className='text-danger'>{errMsg}</p>}
                    
                    <Form>
                        <Form.Group controlId="offerImage" className="mb-3">
                            <Form.Label>Offer Banner <span className='text-danger'>*</span> <small className='fw-light text-secondary'>(Image size should be 800px x 600px)</small></Form.Label>
                            <Form.Control type="file" name="offerImage" accept="image/*" onChange={fileHandle} className='border-dark' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-danger' onClick={handleSubmit}>
                        Submit <ClipLoader color="#fff" size={16} loading={loading} /> 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Offer;
