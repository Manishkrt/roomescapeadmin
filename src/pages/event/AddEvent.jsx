import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const initialValue = {
    title: "",
    date: "",
    location: "",
    timeStart: "",
    timeEnd: "",
    description: "",
}

const AddEvent = () => {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState(initialValue);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change for text fields
    const formHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFormValue({ ...formValue, [name]: value })
    } 
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        const formData = new FormData();
        formData.append("title", formValue.title);
        formData.append("date", formValue.date);
        formData.append("location", formValue.location);
        formData.append("timeStart", formValue.timeStart);
        formData.append("timeEnd", formValue.timeEnd);
        formData.append("description", formValue.description);
        formData.append("image", image); 
        try {
            const response = await api.post("/event/create", formData); 
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Event created successfully",
                showConfirmButton: false,
                timer: 1500
            })
            setFormValue(initialValue);
            setImage("");
            navigate('/event-list')
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-2 p-5 shadow-sm">
            <Link to='/event-list' className="text-decoration-none sidebarcolor  text-white p-2 rounded-2"><i className="fa-solid fa-arrow-left-long"></i></Link>
            <h5 className="text-center mb-4">Add New Event</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    {/* Event Name */}
                    <div className="col-md-6 col-12  mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            value={formValue.title}
                            onChange={formHandle}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
 
                    <div className="col-md-6 col-12 mb-3">
                        <label className="form-label" htmlFor="date">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            value={formValue.date}
                            onChange={formHandle}
                            required
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            value={formValue.location}
                            onChange={formHandle}
                            required
                        />
                    </div>


                    <div className="col-md-3 col-12 mb-3">
                        <label className="form-label" htmlFor="timeStart">Time Start</label>
                        <input
                            type="time"
                            className="form-control"
                            name="timeStart"
                            id="timeStart"
                            value={formValue.timeStart}
                            onChange={formHandle}
                            required
                        />
                    </div>
                    <div className="col-md-3 col-12 mb-3">
                        <label className="form-label" htmlFor="timeEnd">Time End</label>
                        <input
                            type="time"
                            className="form-control"
                            name="timeEnd"
                            id="timeEnd"
                            value={formValue.timeEnd}
                            onChange={formHandle}
                            required
                        />
                    </div> 
                    <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            rows="5"
                            value={formValue.description}
                            onChange={formHandle}
                        ></textarea>
                    </div> 
                    <div className="col-12 text-end mt-4">
                        <button type="submit" className="btn btn-primary bg-escape">
                            Publish Event
                            {loading && (
                                <span
                                    className="ms-2 spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
