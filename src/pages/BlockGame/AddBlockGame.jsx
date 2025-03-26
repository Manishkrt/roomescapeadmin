import React, { useState, useRef } from "react";
import { useGame } from "../../customHook/customHook";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/api";

const AddBlockGame = () => {
    const { game } = useGame();
    const navigate = useNavigate()
    const [selectedGames, setSelectedGames] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [reason, setReason] = useState("");
    const dateInputRef = useRef(null);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    };

    // Handle game selection
    const handleGameSelection = (gameId) => {
        setSelectedGames((prevGames) =>
            prevGames.includes(gameId)
                ? prevGames.filter((id) => id !== gameId)
                : [...prevGames, gameId]
        );
    };

    // Handle date selection (only future dates allowed)
    const handleDateSelection = (e) => {
        const newDate = e.target.value;
        if (newDate && !selectedDates.includes(newDate) && newDate >= getTodayDate()) {
            setSelectedDates([...selectedDates, newDate]);
        }
        e.target.value = ""; // Reset input after selection
    };

    // Remove selected date
    const removeDate = (date) => {
        setSelectedDates(selectedDates.filter((d) => d !== date));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDates.length === 0) {
            alert("Please select at least one future date.");
            return;
        }
        if (selectedGames.length === 0) {
            alert("Please select at least one game.");
            return;
        }

        const payload = {
            date: selectedDates,
            game: selectedGames,
            reason,
        }; 
        try {
            const response = await api.post("/block-games/add", payload); 
            // alert(response.data.message);
            navigate('/block-game-list')
            setSelectedDates([]);
            setSelectedGames([]);
            setReason("");
        } catch (error) {
            console.error(error);
            alert("Error blocking games. Please try again.");
        }
    };

    return (
        <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
            <Link
                to="/booking"
                className="text-decoration-none sidebarcolor text-white p-2 rounded-2"
            >
                <i className="fa-solid fa-arrow-left-long"></i>
            </Link>

            <h5 className="text-center mb-4">Create New Booking</h5>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Select Games */}
                    <div className="col-md-6 mb-3">
                        <label>Select Games</label>
                        {game.map((value) => (
                            <div key={value._id} className="mb-2">
                                <input
                                    type="checkbox"
                                    id={value._id}
                                    checked={selectedGames.includes(value._id)}
                                    onChange={() => handleGameSelection(value._id)}
                                />
                                <label htmlFor={value._id} className="text-capitalize ms-2">
                                    {value.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Select Multiple Dates with Date Picker */}
                    <div className="col-md-6 mb-3">
                        <label>Select Dates</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="date"
                                className="form-control"
                                ref={dateInputRef}
                                onChange={handleDateSelection}
                                min={getTodayDate()} // Prevent past date selection
                            />
                        </div>
                        <div className="mt-2">
                            {selectedDates.map((date) => (
                                <span
                                    key={date}
                                    className="badge bg-primary me-2 p-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeDate(date)}
                                >
                                    {date} ✖
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Reason Input */}
                    <div className="col-12">
                        <label htmlFor="reason">Reason</label>
                        <textarea
                            className="form-control"
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Block Games
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBlockGame;
