// import React, { useState, useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';  // For making API requests
// import { url } from '../URL/Url';  // URL for your backend

// const BlogEdit = () => {
//   const { id } = useParams();  // Get the blog ID from the URL parameters
//   const navigate = useNavigate(); // To redirect after successful update

//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [image, setImage] = useState(null); // Main blog image
//   const [imageAlt, setImageAlt] = useState('');
//   const [descriptionImage, setDescriptionImage] = useState(null); // Description image
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(true);  // To handle loading state
//   const [error, setError] = useState('');  // To handle error message

//   // Fetch the existing blog data when the page loads
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(`${url}/api/getsingleblog/${id}`);
//         if (response.data) {
//           const blog = response.data;
//           setTitle(blog.title);
//           setCategory(blog.category);
//           setShortDescription(blog.shortDescription);
//           setImage(blog.image);  // This will be the URL of the image, you can handle it as per your needs
//           setImageAlt(blog.imageAlt);
//           setDescriptionImage(blog.descriptionImage);  // Same as above
//           setContent(blog.content);
//         } else {
//           setError('Blog not found');
//         }
//       } catch (error) {
//         setError('Error fetching blog data');
//       } finally {
//         setLoading(false);  // Hide the loading state after fetching
//       }
//     };

//     fetchBlogData();
//   }, [id]);  // Dependency on `id` ensures it runs when the page loads or when `id` changes

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleDescriptionImageChange = (e) => {
//     setDescriptionImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if files are present
//     if (!image) {
//       alert('Please select the blog image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('shortDescription', shortDescription);
//     formData.append('imageAlt', imageAlt);
//     formData.append('content', content);
//     formData.append('image', image);  // Append the main image to formData
//     if (descriptionImage) {
//       formData.append('descriptionImage', descriptionImage);  // Append the description image if present
//     }

//     try {
//       const response = await axios.put(`${url}/api/editblog/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = response.data;
//       if (data.message === 'Blog updated successfully') {
//         alert('Blog updated successfully!');
//         navigate(`/BlogList`); // Redirect to the blog page after successful update
//       } else {
//         alert('Error: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       alert('Error updating blog');
//     }
//   };

//   // Conditional rendering for loading, error, and the form
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;  // Display error if data fetch fails
//   }

//   return (
//     <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
//       <h5 className="text-center mb-4">Edit Blog</h5>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           {/* Title */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="title" className="form-label">Title</label>
//             <input
//               type="text"
//               className="form-control"
//               id="title"
//               placeholder="Enter blog title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Category */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="category" className="form-label">Category</label>
//             <input
//               type="text"
//               className="form-control"
//               id="category"
//               placeholder="Enter blog category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </div>

//           {/* Short Description */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="shortDescription" className="form-label">Short Description</label>
//             <textarea
//               className="form-control"
//               id="shortDescription"
//               placeholder="Enter short description"
//               value={shortDescription}
//               onChange={(e) => setShortDescription(e.target.value)}
//               rows="4"
//               required
//             />
//           </div>

//           {/* Blog Image Upload and Display */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="image" className="form-label">Blog Image</label>
//             {image && (
//               <div className="mb-2">
//                 <img
//                   src={image}
//                   alt="Blog preview"
//                   className="img-thumbnail"
//                   style={{ width: '450px', height: '250px', objectFit: 'cover' }}
//                 />
//               </div>
//             )}
//             <input
//               type="file"
//               className="form-control"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>

//           {/* Description Image Upload */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="descriptionImage" className="form-label">Description Image</label>
//             {descriptionImage && (
//               <div className="mb-2">
//                 <img
//                   src={descriptionImage}
//                   alt="Blog preview"
//                   className="img-thumbnail"
//                   style={{ width: '450px', height: '250px', objectFit: 'cover' }}
//                 />
//               </div>
//             )}
//             <input
//               type="file"
//               className="form-control"
//               id="descriptionImage"
//               accept="image/*"
//               onChange={handleDescriptionImageChange}
//             />
//           </div>

//           {/* Image Alt Text */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="imageAlt" className="form-label">Image Alt Text</label>
//             <input
//               type="text"
//               className="form-control"
//               id="imageAlt"
//               placeholder="Enter image alt text"
//               value={imageAlt}
//               onChange={(e) => setImageAlt(e.target.value)}
//               required
//             />
//           </div>

//           {/* TinyMCE Editor for Content */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="content" className="form-label">Blog Content</label>
//             <Editor
//               apiKey="your-tinymce-api-key"  // Your TinyMCE API key
//               value={content}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "image code",
//                 toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
//                 images_upload_url: "/upload-image",  // Optional: If using image upload via TinyMCE
//                 automatic_uploads: true,
//                 images_upload_base_path: "/uploads",
//                 image_caption: true,
//                 paste_data_images: true,
//               }}
//               onEditorChange={(newContent) => setContent(newContent)}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="col-md-12 text-end">
//             <button type="submit" className="btn btn-primary add-blogs-button">
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogEdit;

// working hai without loader

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests
import { url } from "../URL/Url"; // URL for your backend
import Swal from "sweetalert2"; // Import SweetAlert2
import TextEditor from "../TextEditor";

const BlogEdit = () => {
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const navigate = useNavigate(); // To redirect after successful update

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState(null); // Main blog image
  const [imageAlt, setImageAlt] = useState("");
  const [descriptionImage, setDescriptionImage] = useState(null); // Description image
  const [content, setContent] = useState("");
  console.log(content);

  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(""); // To handle error message

  // Fetch the existing blog data when the page loads
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${url}/api/getsingleblog/${id}`);
        if (response.data) {
          const blog = response.data;
          setTitle(blog.title);
          setCategory(blog.category);
          setShortDescription(blog.shortDescription);
          setImage(blog.image); // This will be the URL of the image, you can handle it as per your needs
          setImageAlt(blog.imageAlt);
          setDescriptionImage(blog.descriptionImage); // Same as above
          setContent(blog.content);
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        setError("Error fetching blog data");
      } finally {
        setLoading(false); // Hide the loading state after fetching
      }
    };

    fetchBlogData();
  }, [id]); // Dependency on `id` ensures it runs when the page loads or when `id` changes

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionImageChange = (e) => {
    setDescriptionImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if files are present
    if (!image) {
      alert("Please select the blog image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("shortDescription", shortDescription);
    formData.append("imageAlt", imageAlt);
    formData.append("content", content);
    formData.append("image", image); // Append the main image to formData
    if (descriptionImage) {
      formData.append("descriptionImage", descriptionImage); // Append the description image if present
    }

    try {
      const response = await axios.put(`${url}/api/editblog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      if (data.message === "Blog updated successfully") {
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(`/BlogList`); // Redirect to the blog page after successful update
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      Swal.fire({
        title: "Error!",
        text: "Error updating blog",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Conditional rendering for loading, error, and the form
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error if data fetch fails
  }

  return (
    <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
      <h5 className="text-center mb-4">Edit Blog</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Title */}
          <div className="col-md-12 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Short Description */}
          <div className="col-md-12 mb-3">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <textarea
              className="form-control"
              id="shortDescription"
              placeholder="Enter short description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          {/* Blog Image Upload and Display */}
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">
              Blog Image
            </label>
            {image && (
              <div className="mb-2">
                <img
                  src={image}
                  alt="Blog preview"
                  className="img-thumbnail"
                  style={{
                    width: "450px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Description Image Upload */}
          <div className="col-md-6 mb-3">
            <label htmlFor="descriptionImage" className="form-label">
              Description Image
            </label>
            {descriptionImage && (
              <div className="mb-2">
                <img
                  src={descriptionImage}
                  alt="Blog preview"
                  className="img-thumbnail"
                  style={{
                    width: "450px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              id="descriptionImage"
              accept="image/*"
              onChange={handleDescriptionImageChange}
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
              placeholder="Enter image alt text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              required
            />
          </div>

          {/* TinyMCE Editor for Content */}
          <div className="col-md-12 mb-3">
            <label htmlFor="content" className="form-label">
              Blog Content
            </label>
            {/* <Editor
              apiKey="your-tinymce-api-key"  // Your TinyMCE API key
              value={content}
              init={{
                height: 300,
                menubar: false,
                plugins: "image code",
                toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
                images_upload_url: "/upload-image",  // Optional: If using image upload via TinyMCE
                automatic_uploads: true,
                images_upload_base_path: "/uploads",
                image_caption: true,
                paste_data_images: true,
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            /> */}
            <TextEditor
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>

          {/* Submit Button */}
          <div className="col-md-12 text-end">
            <button type="submit" className="btn btn-primary add-blogs-button">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;

// import React, { useState, useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';  // For making API requests
// import { url } from '../URL/Url';  // URL for your backend
// import Swal from 'sweetalert2';  // Import SweetAlert2

// const BlogEdit = () => {
//   const { id } = useParams();  // Get the blog ID from the URL parameters
//   const navigate = useNavigate(); // To redirect after successful update

//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [image, setImage] = useState(null); // Main blog image
//   const [imageAlt, setImageAlt] = useState('');
//   const [descriptionImage, setDescriptionImage] = useState(null); // Description image
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(true);  // To handle loading state
//   const [error, setError] = useState('');  // To handle error message
//   const [loadingButton, setLoadingButton] = useState(false); // To handle button loading state

//   // Fetch the existing blog data when the page loads
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(`${url}/api/getsingleblog/${id}`);
//         if (response.data) {
//           const blog = response.data;
//           setTitle(blog.title);
//           setCategory(blog.category);
//           setShortDescription(blog.shortDescription);
//           setImage(blog.image);  // This will be the URL of the image, you can handle it as per your needs
//           setImageAlt(blog.imageAlt);
//           setDescriptionImage(blog.descriptionImage);  // Same as above
//           setContent(blog.content);
//         } else {
//           setError('Blog not found');
//         }
//       } catch (error) {
//         setError('Error fetching blog data');
//       } finally {
//         setLoading(false);  // Hide the loading state after fetching
//       }
//     };

//     fetchBlogData();
//   }, [id]);  // Dependency on `id` ensures it runs when the page loads or when `id` changes

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleDescriptionImageChange = (e) => {
//     setDescriptionImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if files are present
//     if (!image) {
//       alert('Please select the blog image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('shortDescription', shortDescription);
//     formData.append('imageAlt', imageAlt);
//     formData.append('content', content);
//     formData.append('image', image);  // Append the main image to formData
//     if (descriptionImage) {
//       formData.append('descriptionImage', descriptionImage);  // Append the description image if present
//     }

//     // Set button loading state to true
//     setLoadingButton(true);

//     try {
//       const response = await axios.put(`${url}/api/editblog/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = response.data;
//       if (data.message === 'Blog updated successfully') {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Blog updated successfully!',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           navigate(`/BlogList`); // Redirect to the blog page after successful update
//         });
//       } else {
//         Swal.fire({
//           title: 'Error!',
//           text: data.message,
//           icon: 'error',
//           confirmButtonText: 'Try Again'
//         });
//       }
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Error updating blog',
//         icon: 'error',
//         confirmButtonText: 'Try Again'
//       });
//     } finally {
//       // Set button loading state back to false
//       setLoadingButton(false);
//     }
//   };

//   // Conditional rendering for loading, error, and the form
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;  // Display error if data fetch fails
//   }

//   return (
//     <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
//       <h5 className="text-center mb-4">Edit Blog</h5>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           {/* Title */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="title" className="form-label">Title</label>
//             <input
//               type="text"
//               className="form-control"
//               id="title"
//               placeholder="Enter blog title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Short Description */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="shortDescription" className="form-label">Short Description</label>
//             <textarea
//               className="form-control"
//               id="shortDescription"
//               placeholder="Enter short description"
//               value={shortDescription}
//               onChange={(e) => setShortDescription(e.target.value)}
//               rows="4"
//               required
//             />
//           </div>

//           {/* Blog Image Upload and Display */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="image" className="form-label">Blog Image</label>
//             {image && (
//               <div className="mb-2">
//                 <img
//                   src={image}
//                   alt="Blog preview"
//                   className="img-thumbnail"
//                   style={{ width: '450px', height: '250px', objectFit: 'cover' }}
//                 />
//               </div>
//             )}
//             <input
//               type="file"
//               className="form-control"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>

//           {/* Description Image Upload */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="descriptionImage" className="form-label">Description Image</label>
//             {descriptionImage && (
//               <div className="mb-2">
//                 <img
//                   src={descriptionImage}
//                   alt="Blog preview"
//                   className="img-thumbnail"
//                   style={{ width: '450px', height: '250px', objectFit: 'cover' }}
//                 />
//               </div>
//             )}
//             <input
//               type="file"
//               className="form-control"
//               id="descriptionImage"
//               accept="image/*"
//               onChange={handleDescriptionImageChange}
//             />
//           </div>

//           {/* Image Alt Text */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="imageAlt" className="form-label">Image Alt Text</label>
//             <input
//               type="text"
//               className="form-control"
//               id="imageAlt"
//               placeholder="Enter image alt text"
//               value={imageAlt}
//               onChange={(e) => setImageAlt(e.target.value)}
//               required
//             />
//           </div>

//           {/* TinyMCE Editor for Content */}
//           <div className="col-md-12 mb-3">
//             <label htmlFor="content" className="form-label">Blog Content</label>
//             <Editor
//               apiKey="your-tinymce-api-key"  // Your TinyMCE API key
//               value={content}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "image code",
//                 toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
//                 images_upload_url: "/upload-image",  // Optional: If using image upload via TinyMCE
//                 automatic_uploads: true,
//                 images_upload_base_path: "/uploads",
//                 image_caption: true,
//                 paste_data_images: true,
//               }}
//               onEditorChange={(newContent) => setContent(newContent)}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="col-md-12 text-end">
//             <button type="submit" className="btn btn-primary add-blogs-button" disabled={loadingButton}>
//               {loadingButton ? (
//                 <span>Loading...</span>  // You can add a loader here
//               ) : (
//                 "Save Changes"
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogEdit;
