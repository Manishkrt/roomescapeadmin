import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const Offer = () => {
    const [show, setShow] = useState(false);
    const [offers, setOffers] = useState([
        { id: 1, offerImage: "offer1.jpg", discount: "10%" },
        { id: 2, offerImage: "offer2.jpg", discount: "20%" }
    ]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle Delete
    const handleDelete = (id) => {
        setOffers(offers.filter(offer => offer.id !== id));
    };

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
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer, index) => (
                        <tr key={offer.id}>
                            <td>{index + 1}</td>
                            <td>{offer.offerImage}</td>
                            <td>{offer.discount}</td>
                            <td>
                                {/* <Button variant="warning" size="sm">
                                    <i className="fa-solid fa-edit"></i>
                                </Button>
                                &nbsp; */}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(offer.id)}>
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
                    <Form>
                        <Form.Group controlId="offerImage" className="mb-3">
                            <Form.Label>Offer Banner <span className='text-danger'>*</span></Form.Label>
                            <Form.Control type="file" name="offerImage" accept="image/*" className='border-dark' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-danger'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Offer;
