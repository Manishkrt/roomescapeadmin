// import React, { useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { url } from '../URL/Url';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [image, setImage] = useState(null); // Main blog image
//   const [imageAlt, setImageAlt] = useState('');
//   const [descriptionImage, setDescriptionImage] = useState(null); // Description image
//   const [content, setContent] = useState('');

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
//     // formData.append('category', category);
//     formData.append('shortDescription', shortDescription);
//     formData.append('imageAlt', imageAlt);
//     formData.append('content', content);
//     formData.append('image', image);  // Append the main image to formData
//     if (descriptionImage) {
//       formData.append('descriptionImage', descriptionImage);  // Append the description image if present
//     }

//     // Log FormData before sending
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await fetch(`${url}/api/blogsadd`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       console.log('Response from server:', data);

//       if (data.message === 'Blog uploaded successfully') {
//         alert('Blog uploaded successfully!');
//       } else {
//         alert('Error: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error uploading blog:', error);
//       alert('Error uploading blog');
//     }
//   };

//   return (
//     <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
//       <h5 className="text-center mb-4">Add New Blog</h5>
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

//           {/* Short Description (Textarea) */}
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

//           {/* Blog Image Upload */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="image" className="form-label">Blog Image</label>
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
//               apiKey="xh1g0l90gr7zs7l3cw8teu4ehv9porybdj5r9hn1r6hj8x5k"  // Your TinyMCE API key
//               value={content}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "image code",
//                 toolbar:
//                   "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
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
//               Publish Blog
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBlogs;

// working hai second wala

// import React, { useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { url } from '../URL/Url';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [image, setImage] = useState(null); // Main blog image
//   const [imageAlt, setImageAlt] = useState('');
//   const [descriptionImage, setDescriptionImage] = useState(null); // Description image
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);  // Loading state to track form submission

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
//     // formData.append('category', category);
//     formData.append('shortDescription', shortDescription);
//     formData.append('imageAlt', imageAlt);
//     formData.append('content', content);
//     formData.append('image', image);  // Append the main image to formData
//     if (descriptionImage) {
//       formData.append('descriptionImage', descriptionImage);  // Append the description image if present
//     }

//     // Log FormData before sending
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     setLoading(true);  // Set loading to true before the API request

//     try {
//       const response = await fetch(`${url}/api/blogsadd`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       console.log('Response from server:', data);

//       if (data.message === 'Blog uploaded successfully') {
//         alert('Blog uploaded successfully!');
//       } else {
//         alert('Error: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error uploading blog:', error);
//       alert('Error uploading blog');
//     } finally {
//       setLoading(false);  // Set loading to false once the request is complete
//     }
//   };

//   return (
//     <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
//       <h5 className="text-center mb-4">Add New Blog</h5>
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

//           {/* Short Description (Textarea) */}
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

//           {/* Blog Image Upload */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="image" className="form-label">Blog Image</label>
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
//               apiKey="xh1g0l90gr7zs7l3cw8teu4ehv9porybdj5r9hn1r6hj8x5k"  // Your TinyMCE API key
//               value={content}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "image code",
//                 toolbar:
//                   "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
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
//               Publish Blog
//               {loading && <span className="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBlogs;

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { url } from "../URL/Url";
import Swal from "sweetalert2"; // Import SweetAlert2
import TextEditor from "../TextEditor";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState(null); // Main blog image
  const [imageAlt, setImageAlt] = useState("");
  const [descriptionImage, setDescriptionImage] = useState(null); // Description image
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false); // Loading state to track form submission

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select the blog image",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    // formData.append('category', category);
    formData.append("shortDescription", shortDescription);
    formData.append("imageAlt", imageAlt);
    formData.append("content", content);
    formData.append("image", image); // Append the main image to formData
    if (descriptionImage) {
      formData.append("descriptionImage", descriptionImage); // Append the description image if present
    }

    // Log FormData before sending
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    setLoading(true); // Set loading to true before the API request

    try {
      const response = await fetch(`${url}/api/blogsadd`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (
        response.status === 200 &&
        data.message === "Blog uploaded successfully"
      ) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Blog uploaded successfully!",
        });

        // Reset the form data after successful upload
        setTitle("");
        setCategory("");
        setShortDescription("");
        setImage(null);
        setImageAlt("");
        setDescriptionImage(null);
        setContent("");
      } else {
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Error uploading blog",
        });
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading blog",
      });
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
      <h5 className="text-center mb-4">Add New Blog</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Title */}
          <div className="col-md-6 mb-3">
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

          {/* Short Description (Textarea) */}
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

          {/* Blog Image Upload */}
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

          {/* Description Image Upload */}
          <div className="col-md-6 mb-3">
            <label htmlFor="descriptionImage" className="form-label">
              Description Image
            </label>
            <input
              type="file"
              className="form-control"
              id="descriptionImage"
              accept="image/*"
              onChange={handleDescriptionImageChange}
            />
          </div>

          {/* TinyMCE Editor for Content */}
          <div className="col-md-12 mb-3">
            <label htmlFor="content" className="form-label">
              Blog Content
            </label>
            {/* <Editor
              apiKey="xh1g0l90gr7zs7l3cw8teu4ehv9porybdj5r9hn1r6hj8x5k"  // Your TinyMCE API key
              value={content}
              init={{
                height: 300,
                menubar: false,
                plugins: "image code",
                toolbar:
                  "undo redo | styleselect | bold italic | alignleft aligncenter alignright | image code",
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
