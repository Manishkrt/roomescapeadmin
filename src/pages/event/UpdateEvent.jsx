import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";

const UpdateEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        title: "",
        date: "",
        location: "",
        timeStart: "",
        timeEnd: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/event/single/${eventId}`);
                const formattedDate = data.date ? data.date.split("T")[0] : "";
                setFormValue({
                    title: data.title,
                    date: formattedDate,
                    location: data.location,
                    timeStart: data.timeStart,
                    timeEnd: data.timeEnd,
                    description: data.description,
                });
                setExistingImage(data.image);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };
        fetchEvent();
    }, [eventId]);

    const formHandle = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

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
        if (image) formData.append("image", image); // Append new image if updated

        try {
            await api.put(`/event/update/${eventId}`, formData);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Event updated successfully",
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/event-list");
        } catch (error) {
            console.log(error);

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-2 p-5 shadow-sm">
            <h5 className="text-center mb-4">Update Event</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formValue.title}
                            onChange={formHandle}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {existingImage && (
                            <div className="mt-2">
                                <img src={existingImage} alt="Event" width="100" />
                            </div>
                        )}
                    </div>

                    <div className="col-md-6 col-12 mb-3">
                        <label className="form-label" htmlFor="date">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
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
                            rows="5"
                            value={formValue.description}
                            onChange={formHandle}
                        ></textarea>
                    </div>

                    <div className="col-12 text-end mt-4">
                        <button type="submit" className="btn btn-primary">
                            Update Event
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

export default UpdateEvent;
