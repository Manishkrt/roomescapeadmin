import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';   
import { useBlog } from "../../customHook/customHook";
import api from "../../api/api";


const Blog = () => {
    const navigate = useNavigate();  
    const {blog, loadingFetchBlog, getBlogFunc} = useBlog() 

  const handleEdit = (id) => {
    // Redirect to the Edit page with the blog ID in the URL
    navigate(`/BlogEdit/${id}`);
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
            const response = await api.delete(`/blog/remove/${id}`);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "blog removed successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                getBlogFunc()
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
   
  if (loadingFetchBlog) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container box-shadow-common p-3">
      <h5 className="text-start mb-4">Blog List</h5>

      <div className="row">
        {blog.length > 0 ? (
          blog.map((value) => (
            <div key={value._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img
                  src={value.image}
                  className="card-img-top"
                  alt={value.imageAlt}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{value.title}</h5>
                  <p className="card-text">{value.shortDescription}</p>
                  <small className="text-muted">
                    Published on: {new Date(value.createdAt).toLocaleDateString()}
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
      </div> 
    </div>
  );
};

export default Blog;
