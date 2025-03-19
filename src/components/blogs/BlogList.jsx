import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { url } from "../URL/Url";
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';  
import { SidebarContext } from "../../context/sidebarContext";
const BlogList = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
      const {blogs, setBlogs,loading, setLoading} = useContext(SidebarContext); 
  
  const blogsPerPage = 3; // Number of blogs per page
  const navigate = useNavigate(); // Initialize the navigate function

 
  // Fetch blogs from API
 

  const handleEdit = (id) => {
    // Redirect to the Edit page with the blog ID in the URL
    navigate(`/BlogEdit/${id}`);
  };

  // Delete button handler
  



  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this blog?")) {
  //     try {
  //       const response = await axios.delete(`${url}/api/deleteblog/${id}`);
  //       alert(response.data.message);  // Show success message
  //       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));  // Remove deleted blog from state
  //     } catch (error) {
  //       console.error('Error deleting blog:', error);
  //       alert('Error deleting blog');
  //     }
  //   }
  // };


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
        const response = await axios.delete(`${url}/api/deleteblog/${id}`);
  
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
  

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container box-shadow-common p-3">
      <h5 className="text-start mb-4">Blog List</h5>

      <div className="row">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.imageAlt}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.shortDescription}</p>
                  <small className="text-muted">
                    Published on: {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(blog._id)}
                    
                  >
                    <i className="fas fa-edit me-1"></i>
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(blog._id)}
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

      {blogs.length > blogsPerPage && (
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {Array.from(
              { length: Math.ceil(blogs.length / blogsPerPage) },
              (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default BlogList;
