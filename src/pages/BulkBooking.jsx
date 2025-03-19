import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Swal from 'sweetalert2'; 
import api from "../api/api"; 


const BulkBookingList = () => { 
    
    const [bulkBooking, setBulkBooking] = useState([])
    const [loading, setLoading] = useState(false)

    
    const updateRespondedFunc = async (value, id) => { 
        try {
            const response = await api.post(`/bulk-booking/update-response/${id}`, { responded: value })
            console.log("response update", response);
            fetchEventFunc() 
        } catch (error) {
            console.log("error", error);
        }
    }

    const fetchEventFunc = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/bulk-booking/all-event-query`)
            console.log("response response", response.data.data);
            if (response.status == 200) {
                setBulkBooking(response.data.data)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        fetchEventFunc()
    }, [])

    return (
        <div className="container box-shadow-common p-3">
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Bulk Booking List</h5>
                {/* <Link
                    to={'/add-new-game'}
                    style={{ backgroundColor: 'rgb(202 77 77)', border: 'none', textDecoration: "none" }}
                    className="text-white d-inline-block"
                >
                    <i className="fas fa-layer-group"></i> Add New Game
                </Link> */}
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Booking Date</th>
                            <th>Event Type</th>
                            <th>Total Player</th>
                            <th>Response</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>


                        {bulkBooking.length > 0 ? (
                            bulkBooking.map((value) => (
                                <tr key={value._id}>
                                    <td className="text-capitalize">{value.name} </td>
                                    <td >{value.email}</td>
                                    <td>{value.phone}</td>
                                    <td> {formatDate(value.eventDate)}</td>
                                    <td>{value.eventType}</td>
                                    <td> {value.totalPlayer}</td>
                                    <td>
                                        <span
                                            className={`switch-button rounded-pill border-secondary border ${value.responded ? "active" : ""}`}
                                            onClick={() => updateRespondedFunc(!value.responded, value._id)} />

                                    </td>
                                    {/* <td>
                                        <div className="card-footer d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleEdit(value._id)}
                                            >
                                                <i className="fas fa-edit me-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(value._id)}
                                            >
                                                <i className="fas fa-trash-alt me-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={7}> Oops, there is no data </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
};

export default BulkBookingList;
