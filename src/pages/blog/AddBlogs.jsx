

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2 
import { url } from "../../components/URL/Url";
import TextEditor from "../../components/TextEditor";
import api from "../../api/api";

const initialValue = {
    title: "",
    shortDescription: "",
    imageAlt: "",
}



const AddBlogs = () => {
    const [image, setImage] = useState(null);
    const [formValue, setFormValue] = useState(initialValue)
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false); // Loading state to track form submission

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const formHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFormValue({ ...formValue, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!image) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select the blog image",
            });
            return;
        } 
        const formData = new FormData();
        formData.append("title", formValue.title);
        formData.append("shortDescription", formValue.shortDescription);
        formData.append("imageAlt", formValue.imageAlt);
        formData.append('description', description);
        formData.append("image", image);
        setLoading(true);
        try {
            const response = await api.post(`/blog/create`, formData);
            console.log("Response from server:", response);
            if (response.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "public holiday added successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                setFormValue(initialValue)
                setImage(null);
                setDescription("")
            } else { 
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) { 
            console.log("error", error); 
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            })
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
            <h5 className="text-center mb-4">Add New Blog</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Title */}
                    <div className="col-12 mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter blog title"
                            value={formValue.title}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="image" className="form-label">
                            Blog Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Image Alt Text */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="imageAlt" className="form-label">
                            Image Alt Text
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="imageAlt"
                            name="imageAlt"
                            placeholder="Enter image alt text"
                            value={formValue.imageAlt}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>

                    {/* Short Description (Textarea) */}
                    <div className="col-md-12 mb-3">
                        <label htmlFor="shortDescription" className="form-label">
                            Short Description
                        </label>
                        <textarea
                            className="form-control"
                            id="shortDescription"
                            placeholder="Enter short description"
                            value={formValue.shortDescription}
                            name="shortDescription"
                            onChange={(e) => formHandle(e)}
                            rows="4"
                            required
                        />
                    </div>

                    {/* Blog Image Upload */}



                    {/* TinyMCE Editor for Content */}
                    <div className="col-md-12 mb-3">
                        <label htmlFor="content" className="form-label">
                            Description
                        </label>
                        <TextEditor
                            value={description}
                            onChange={(value) => setDescription(value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary add-blogs-button">
                            Publish Blog
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

export default AddBlogs;
