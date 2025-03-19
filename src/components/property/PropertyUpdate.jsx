import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../URL/Url";
import { SidebarContext } from "../../context/sidebarContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import TextEditor from "../TextEditor";

function PropertyUpdate() {
  const { id } = useParams();
  const [sellerName, setSellerName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Pending");
  const [price, setPrice] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  console.log(propertyImage);

  const [descriptionImage, setDescriptionImage] = useState(null);
  const [description, setDescription] = useState("");

  const [editPropertyImage, setEditPropertyImage] = useState(false);
  const [previewPropertyImage, setPreviewPropertyImage] = useState("");
  const [editDescriptionImage, setEditDescriptionImage] = useState(false);
  const [previewDescriptionImage, setPreviewDescriptionImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { getCategory, CategoryType } = useContext(SidebarContext);

  const statusOptions = ["Approved", "Pending"];

  const getProject = async (id) => {
    await fetch(`${url}/api/project/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSellerName(data.sellerName);
        setCity(data.city);
        setCategory(data.category);
        setType(data.type);
        setStatus(data.status);
        setPrice(data.price);
        setPropertyName(data.projectName);
        setPreviewPropertyImage(data.propertyImage);
        setPreviewDescriptionImage(data.descriptionImage);
        setDescription(data.description);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProject(id);
    }
  }, [id]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      sellerName,
      city,
      category,
      type,
      status,
      price,
      propertyName,
      propertyImage,
      descriptionImage,
      description
    );

    const formData = new FormData();
    formData.append("sellerName", sellerName);
    formData.append("city", city);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("projectName", propertyName);
    if (propertyImage) {
      formData.append("propertyImage", propertyImage);
    }
    if (descriptionImage) {
      formData.append("descriptionImage", descriptionImage);
    }
    formData.append("description", description);

    setLoadingButton(true);

    fetch(`${url}/api/project/update/${id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Project updated successful") {
          getProject(data.projectId);
          setEditPropertyImage(false);
          setEditDescriptionImage(false);
          Swal.fire({
            title: "Success!",
            text: "Project updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else if (data.message === "No fields to update") {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No fields to update",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonText: "OK",
        });
      })
      .finally(() => setLoadingButton(false));
  };

  return (
    <div className="container mt-2 box-shadow-common p-5 add-blogwrapper overflow-x-hidden">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h4 className="text-center mb-4">Update Property</h4>
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
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="propertyImage" className="form-label">
                  Property Image
                </label>
                {editPropertyImage ? (
                  <div className="d-flex flex-column">
                    <input
                      type="file"
                      className="form-control mb-2"
                      id="propertyImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setPropertyImage)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditPropertyImage(false);
                      }}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column">
                    <img
                      src={previewPropertyImage}
                      alt=""
                      className="d-inline-block rounded mb-2"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditPropertyImage(true);
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="descriptionImage" className="form-label">
                  Description Image
                </label>

                {editDescriptionImage ? (
                  <div className="d-flex flex-column">
                    <input
                      type="file"
                      className="form-control"
                      id="descriptionImage"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, setDescriptionImage)
                      }
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditDescriptionImage(false);
                      }}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column">
                    <img
                      src={previewDescriptionImage}
                      alt=""
                      className="d-inline-block rounded mb-2"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditDescriptionImage(true);
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                )}
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingButton}
              >
                {loadingButton ? "Uploading" : "Submit"}
                {loadingButton && (
                  <span
                    className="ms-2 spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default PropertyUpdate;
