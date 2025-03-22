import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGame } from "../../customHook/customHook";
import api from "../../api/api";
import { Form } from "react-bootstrap";


const GameList = () => {
    const { game, loadingFetchGame, getGameFunc } = useGame()
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit-game/${id}`);
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
                const response = await api.delete(`/game/remove/${id}`);
                if (response.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "game removed successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    getGameFunc()
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

    
    const updateBookingAvailableFunc = async(e, id)=>{
        e.preventDefault()  
        try {
            const response = await api.post(`/game/update-booking-available/${id}`, {value : e.target.checked} )
            getGameFunc() 
        } catch (error) {
            console.log("error", error); 
        }
    }
    const updateGameStatusFunc = async(e, id)=>{
        e.preventDefault()  
        try {
            const response = await api.post(`/game/update-game-status/${id}`, {value : e.target.checked} )
            getGameFunc() 
        } catch (error) {
            console.log("error", error); 
        }
    }



    if (loadingFetchGame) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container box-shadow-common p-3"> 
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Game  List</h5>
                <Link
                    to={'/add-new-game'}
                    
                    className="text-white d-inline-block mb-0 d-flex align-items-center justify-content-center px-3 bg-escape text-decoration-none rounded-2"
                >
                    <i className="fa-solid fa-chess-board"></i> &nbsp;
                    Add New Game
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Game Name</th>
                            <th>Participent</th>
                            <th>Status</th>
                            <th>Booking Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {game.length > 0 ? (
                            game.map((value) => (
                                <tr key={value._id}>
                                    <td>
                                        <img
                                            src={value.thumbnail}
                                            className="card-img-top rounded-2"
                                            alt="Game image"
                                            style={{ height: "70px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className="text-capitalize">{value.name}</td>
                                    <td>{value.minParticipent}-{value.maxParticipent}</td>
                                    <td>{value.status}

                                        <Form.Check
                                            type="switch" 
                                            onChange={e=>updateGameStatusFunc(e, value._id)}
                                            // checked={value.status}
                                            className={value.status === 'Yes' ? 'switch-active' : 'switch-inactive'}
                                            defaultChecked={value.status}
                                            
                                        />
                                    </td>
                                    <td>{value.bookingAvailable}
                                        <Form.Check
                                            type="switch" 
                                            onChange={e=>updateBookingAvailableFunc(e, value._id)}
                                            defaultChecked={value.bookingAvailable}
                                            className={value.bookingAvailable === 'Yes' ? 'switch-active' : 'switch-inactive'}
                                        />
                                    </td>
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
                                <td colSpan={6}> Oops, there is no data </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* <div className="row">
                {game.length > 0 ? (
                    game.map((value) => (
                        <div key={value._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100">
                                <img 
                                    src={value.thumbnail}
                                    className="card-img-top"
                                    alt="Game image"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize">{value.name}</h5> 
                                    <small className="text-muted">
                                        Participent : {value.minParticipent}-{value.maxParticipent}
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
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <h5>Oops, there is no data</h5>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default GameList;
