import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SidebarContext } from "../../context/sidebarContext";
// import TextEditor from "../TextEditor";
// import { url } from "../URL/Url";
import Swal from "sweetalert2";
import TextEditor from "../../components/TextEditor";
import { url } from "../../components/URL/Url";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../customHook/customHook";


const initialValue = {
    name: "",
    maxParticipent: "",
    minParticipent: "",
    gameTime: "",
    genre: "",
    minAge: "",
    difficulty: 50,
    frustration: 50,
    screwUp: 50,
}

const reviewInitialValue = {
    name: "",
    totalCustomer : 0,
    rating: 4,
    message: ""
}


const AddGame = () => {
    const navigate = useNavigate()
    const { getGameFunc } = useGame()


    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState('')
    const [formValue, setFormValue] = useState(initialValue)
    const [reviewFormValue, setReviewFormValue] = useState(reviewInitialValue)


    const [loading, setLoading] = useState(false);

    const formHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFormValue({ ...formValue, [name]: value })
    }
    const reviewFormHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setReviewFormValue({ ...reviewFormValue, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("name", formValue.name);
        formData.append("description", description);
        formData.append("maxParticipent", formValue.maxParticipent);
        formData.append("minParticipent", formValue.minParticipent);

        formData.append("gameTime", formValue.gameTime);
        formData.append("genre", formValue.genre);
        formData.append("minAge", formValue.minAge);
        formData.append("difficulty", formValue.difficulty);
        formData.append("frustration", formValue.frustration);
        formData.append("screwUp", formValue.screwUp);

        formData.append("review", JSON.stringify(reviewFormValue));

        setLoading(true);
        try {
            const response = await api.post(`/game/create`, formData);
            if (response.status === 201) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "public holiday added successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/game-list')
                setFormValue(initialValue)
                setReviewFormValue(reviewInitialValue)
                setThumbnail('')
                setDescription('')
                getGameFunc()
            } else {
                // Show error alert
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error uploading project:", error);
            // Show error alert
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
        <div className="container mt-2 box-shadow-common p-5 add-blogwrapper overflow-x-hidden">
            <h4 className="text-center mb-4">Add New Game</h4>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Game Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={formValue.name}
                            name="name"
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="thumbnail" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="thumbnail"
                            accept="image/*"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="maxParticipent" className="form-label">
                            Minimum Participent
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="minParticipent"
                            name="minParticipent"
                            value={formValue.minParticipent}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="maxParticipent" className="form-label">
                            Maximum Participent
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="maxParticipent"
                            name="maxParticipent"
                            value={formValue.maxParticipent}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>




                    <div className="col-md-3">
                        <label htmlFor="gameTime" className="form-label">
                            Room Time <span className="fw-light">( in min.)</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="gameTime"
                            name="gameTime"
                            value={formValue.gameTime}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="minAge" className="form-label">
                            Minimum Age
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="minAge"
                            name="minAge"
                            value={formValue.minAge}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="genre" className="form-label">
                            Genre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="genre"
                            name="genre"
                            value={formValue.genre}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="difficulty" className="form-label fw-bold mb-0">
                            Difficulty level : <span className="text-primary">{formValue.difficulty} %</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type="range"
                                className="form-range"
                                id="difficulty"
                                name="difficulty"
                                value={formValue.difficulty}
                                onChange={formHandle}
                                min={0}
                                max={100}
                                step={5}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="frustration" className="form-label fw-bold mb-0">
                            Frustration level : <span className="text-primary">{formValue.frustration} %</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type="range"
                                className="form-range"
                                id="frustration"
                                name="frustration"
                                value={formValue.frustration}
                                onChange={formHandle}
                                min={0}
                                max={100}
                                step={5}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="screwUp" className="form-label fw-bold mb-0">
                            Screw up probability : <span className="text-primary ">{formValue.screwUp} %</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type="range"
                                className="form-range"
                                id="screwUp"
                                name="screwUp"
                                value={formValue.screwUp}
                                onChange={formHandle}
                                min={0}
                                max={100}
                                step={5}
                                required
                            />
                            {/* Progress Background */}
                            {/* <div
                                className="progress-bar"
                                style={{
                                    width: `${formValue.screwUp}%`,
                                    height: "5px",
                                    backgroundColor: "#007bff",
                                    position: "absolute",
                                    bottom: "15px",
                                    left: 0,
                                    transition: "width 0.3s ease-in-out",
                                }}
                            ></div> */}
                        </div>
                    </div>


                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <TextEditor value={description} onChange={setDescription} />
                    </div>


                    <h4 className="col-12 mb-3">Review Section</h4>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={reviewFormValue.name}
                            onChange={reviewFormHandle}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="totalCustomer" className="form-label">
                            Total Customer
                        </label>
                        <input
                            type="Number"
                            className="form-control"
                            id="totalCustomer"
                            name="totalCustomer"
                            value={reviewFormValue.totalCustomer}
                            onChange={reviewFormHandle}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="rating" className="form-label mb-0">
                            Rating : <span className="text-primary">{reviewFormValue.rating} </span>
                        </label>
                        <div className="position-relative">
                            <input
                                type="range"
                                className="form-range"
                                id="rating"
                                name="rating"
                                value={reviewFormValue.rating}
                                onChange={reviewFormHandle}
                                min={1}
                                max={5}
                                // step={5}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="message" className="form-label">
                            Customer Message
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="message"
                            name="message"
                            value={reviewFormValue.message}
                            onChange={reviewFormHandle}
                            required
                        />
                    </div>






                </div>

                <div className="text-end mt-4">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Uploading" : "Submit"}
                        {loading && (
                            <span
                                className="ms-2 spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGame;
