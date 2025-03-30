import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import Swal from 'sweetalert2'
import { ClipLoader } from "react-spinners";

const initialValue = {
    total : 0,
    page : 1,
    totalPages: 0,
    data: []
}
const EventList = () => {
    const [event, setEvent] = useState(initialValue)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/update-event/${id}`);
    };
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        });

        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/event/${id}`);
                if (response.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Event removed successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchEventFunc()
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "something went wrong. Please try again",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "something went wrong. Please try again",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    };

    const fetchEventFunc = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/event`) 
            if (response.status == 200) {
                setEvent(response.data) 
                
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
    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };
 

    useEffect(() => {
        fetchEventFunc()
    }, [])
    return (
        <>
            <div className="container box-shadow-common p-3">
                <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                    <h5>Event List</h5>
                    <Link
                        to={'/add-new-event'}
                        className="text-white d-inline-block mb-0 d-flex align-items-center justify-content-center px-3 bg-escape text-decoration-none rounded-2"
                       
                    >
                        <i className="fa-solid fa-bullhorn"></i>&nbsp;
                        Add New Event
                    </Link>
                </div>

                <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th> 
                            <th>Event Date</th>
                            <th>Location</th>
                            <th>Timing</th> 
                            <th>Total Apply</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {loading ?
                        <tr>
                            <td colSpan={7}> 
                                <ClipLoader color="#ED2224" size={16} loading={true} />
                            </td>
                        </tr>
                         : event.data.length > 0 ? (
                            event.data.map((value) => (
                                <tr key={value._id}>
                                    <td><Link to={`/event/${value._id}`} className='text-decoration-none text-primary'> {value.title} </Link></td>
                                    <td >
                                        <img
                                            src={value.image}
                                            className="card-img-top rounded-2"
                                            alt="Game image"
                                            // style={{ width: "150px", objectFit: "cover" }}
                                            style={{ width: "150px", objectFit: "cover", boxShadow: "5px 5px 15px rgba(0,0,0,0.3)", backgroundColor: "#FFCCCC" }}
                                        />
                                    </td> 
                                    <td className='text-secondary'>{formatDate(value.date)}</td>
                                    <td className='text-secondary'>{value.location}</td>
                                    <td className='text-secondary'>{convertTo12HourFormat(value.timeStart)} - {convertTo12HourFormat(value.timeEnd)}</td> 
                                    <td className='text-secondary'>{value.count} </td> 
                                    <td>
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
                                    </td>
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
        </>
    )
}

export default EventList