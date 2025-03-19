import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SidebarContext } from "../../context/sidebarContext";
import TextEditor from "../TextEditor";
import { url } from "../URL/Url";
import Swal from "sweetalert2";

const NewProject = () => {
  const [sellerName, setSellerName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Pending");
  const [price, setPrice] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  const [descriptionImage, setDescriptionImage] = useState(null);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const { getCategory, CategoryType } = useContext(SidebarContext);

  const statusOptions = ["Approved", "Pending"];

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sellerName", sellerName);
    formData.append("city", city);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("projectName", propertyName);
    formData.append("propertyImage", propertyImage);
    formData.append("descriptionImage", descriptionImage);
    formData.append("description", description);
    formData.append("role", "admin");

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/project/add`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (
        response.status === 201 &&
        data.message === "Project uploaded successfully"
      ) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New project uploaded successfully!",
        });

        // Reset the form data after successful upload
        setSellerName("");
        setCity("");
        setCategory("");
        setType("");
        setStatus("Pending");
        setPrice("");
        setPropertyName("");
        setPropertyImage(null);
        setDescriptionImage(null);
        setDescription("");
      } else {
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Error uploading new project",
        });
      }
    } catch (error) {
      console.error("Error uploading project:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading new project",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2 box-shadow-common p-5 add-blogwrapper overflow-x-hidden">
      <h4 className="text-center mb-4">Add New Project</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="sellerName" className="form-label">
              Seller Name
            </label>
            <input
              type="text"
              className="form-control"
              id="sellerName"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="propertyName" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              className="form-control"
              id="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="propertyImage" className="form-label">
              Property Image
            </label>
            <input
              type="file"
              className="form-control"
              id="propertyImage"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setPropertyImage)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="descriptionImage" className="form-label">
              Description Image
            </label>
            <input
              type="file"
              className="form-control"
              id="descriptionImage"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setDescriptionImage)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {getCategory &&
                getCategory.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              {CategoryType &&
                CategoryType.map((t, index) => (
                  <option key={index} value={t.name}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {statusOptions.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <TextEditor value={description} onChange={setDescription} />
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

export default NewProject;
