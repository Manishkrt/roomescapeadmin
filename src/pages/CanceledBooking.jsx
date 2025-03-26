import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Swal from 'sweetalert2'; 
import api from "../api/api"; 

const CanceledBooking = () => { 
    const [canceledBooking, setCanceledBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEventFunc = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await api.get(`/cancel-booking/all?page=${pageNumber}&limit=15`);
            if (response.status === 200) {
                setCanceledBooking(response.data.data);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        fetchEventFunc(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container box-shadow-common p-3">
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Canceled Booking List</h5>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Game</th>
                            <th>Booking Date</th>
                            <th>TimeSlot</th>
                            <th>Cancel Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7}>Loading...</td>
                            </tr>
                        ) : canceledBooking.length > 0 ? (
                            canceledBooking.map((value) => (
                                <tr key={value._id}>
                                    <td className="text-capitalize">{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.phone}</td>
                                    <td>{value.game?.name || "N/A"}</td>
                                    <td>{formatDate(value.bookingDate)}</td>
                                    <td>{value.timeSlot}</td>
                                    <td>{formatDate(value.canceledAt)}</td>
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
            {totalPages>1 ?
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary me-2"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Previous
                </button>
                <span className="align-self-center">Page {page} of {totalPages}</span>
                <button
                    className="btn btn-primary ms-2"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div> : null }
        </div>
    );
};

export default CanceledBooking;
