import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import api from "../api/api"; 

const BulkBookingList = () => { 
    const [bulkBooking, setBulkBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);  

    const updateRespondedFunc = async (value, id) => { 
        try {
            await api.post(`/bulk-booking/update-response/${id}`, { responded: value });
            fetchEventFunc(currentPage); 
        } catch (error) {
            console.error("Error updating response:", error);
        }
    };

    const fetchEventFunc = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/bulk-booking/all-event-query?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                setBulkBooking(response.data.data);
                setTotalPages(response.data.totalPages);
                setCurrentPage(Number(response.data.currentPage));
            } 
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    useEffect(() => {
        fetchEventFunc(currentPage);
    }, [currentPage, limit]);

    return (
        <div className="container box-shadow-common p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Bulk Booking List {currentPage}</h5> 
                <div>
                    <label htmlFor="limit">Limit</label>
                    <select name="" id="limit" className="form-select" value={limit} onChange={e=>setLimit(e.target.value)}>
                       
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {bulkBooking.length > 0 ? (
                            bulkBooking.map((value) => (
                                <tr key={value._id}>
                                    <td className="text-capitalize">{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.phone}</td>
                                    <td>{formatDate(value.eventDate)}</td>
                                    <td>{value.eventType}</td>
                                    <td>{value.totalPlayer}</td>
                                    <td>
                                        <span
                                            className={`switch-button rounded-pill border-secondary border ${value.responded ? "active" : ""}`}
                                            onClick={() => updateRespondedFunc(!value.responded, value._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={7}>Oops, there is no data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 ?
            <div className="d-flex justify-content-center align-items-center mt-3">
                <button
                    className="btn btn-outline-primary mx-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>

                <span> Page {currentPage} of {totalPages} </span>

                <button
                    className="btn btn-outline-primary mx-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    Next
                </button>
            </div> : null }
        </div>
    );
};

export default BulkBookingList;
