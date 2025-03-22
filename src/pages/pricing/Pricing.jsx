import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { useGame, usePricing } from "../../customHook/customHook";


const Pricing = () => {
    const { pricing, loadingFetchPricing } = usePricing()
    const navigate = useNavigate(); 

    const handleEdit = (id) => {
        navigate(`/BlogEdit/${id}`);
    };


    const handleDelete = async (id) => {
        // SweetAlert confirmation dialog
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
                const response = {}
                // const response = await axios.delete(`${url}/api/deleteblog/${id}`);

                // Check if response status is 200
                if (response.status === 200) {
                    Swal.fire('Deleted!', response.data.message, 'success');  // Show success message
                    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));  // Remove deleted blog from state
                } else {
                    Swal.fire('Error!', 'There was an issue with deleting the blog.', 'error');  // Show error if status is not 200
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                Swal.fire('Error!', 'There was an error deleting the blog.', 'error');  // Show error message if the request fails
            }
        }
    };



    if (loadingFetchPricing) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container box-shadow-common p-3">
            <h5 className="text-start mb-4">Price List</h5>

            <div className="row"> 
                {pricing.length > 0 ? (
                    pricing.map((value) => (
                        <div key={value._id} className="col-lg-6 col-md-8 col-12">
                            <div className="text-center text-uppercase bg-secondary text-white">
                                <h4>{value.dayType == "weekday" ? value.dayType : "Weekend/Public Holidays"}</h4>
                            </div>
                            <div className="table-responsive">
                                <table className="table border">
                                    <thead>
                                        <tr>
                                            <th>People</th>
                                            <th>Price/Person</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.pricing.map(priceValue=>(
                                            <tr key={priceValue._id}>
                                                <td>
                                                    {priceValue.maxPeople < 20 ?
                                                    <>{priceValue.minPeople} - {priceValue.maxPeople}</> :
                                                    <>{priceValue.minPeople}+</>
                                                }
                                                </td>
                                                <td>
                                                &#8377; {priceValue.rate}/Person
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="card h-100">
                                
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize">{value.name}</h5>
                                    <p className="card-text">{value.description}</p>
                                    <small className="text-muted">
                                       Maximum Participent : {value.maxParticipent}
                                    </small>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
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
                            </div> */}
                        </div>
                    ))
                ) 
                : (
                    <div className="text-center">
                        <h5>Oops, there is no data</h5>
                    </div>
                )} 
            </div> 
        </div>
    );
};

export default Pricing;
