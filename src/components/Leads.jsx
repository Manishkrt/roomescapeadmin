// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Leads = () => {
//   const [leads, setLeads] = useState([]);

//   // Simulate fetching leads data from an API
//   useEffect(() => {
//     const mockLeads = [
//       { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", status: "New", source: "Facebook" },
//       { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", status: "Follow-up", source: "Google" },
//       { id: 3, name: "Sarah Lee", email: "sarah.lee@example.com", phone: "555-123-4567", status: "Converted", source: "Referral" },
//       { id: 4, name: "Michael Brown", email: "michael.brown@example.com", phone: "444-222-3333", status: "New", source: "LinkedIn" },
//       { id: 5, name: "Emily Clark", email: "emily.clark@example.com", phone: "888-555-1111", status: "Follow-up", source: "Instagram" },
//     ];

//     // Set mock leads data to state
//     setLeads(mockLeads);
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Leads List</h2>
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered shadow-sm">
//           <thead className="thead-dark">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Source</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead.id}>
//                 <td>{lead.id}</td>
//                 <td>{lead.name}</td>
//                 <td>{lead.email}</td>
//                 <td>{lead.phone}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       lead.status === "New"
//                         ? "badge-info"
//                         : lead.status === "Follow-up"
//                         ? "badge-warning"
//                         : "badge-success"
//                     }`}
//                   >
//                     {lead.status}
//                   </span>
//                 </td>
//                 <td>{lead.source}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Leads;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  // Simulate fetching leads data from an API
  useEffect(() => {
    const mockLeads = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", status: "New", source: "Facebook" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", status: "Follow-up", source: "Google" },
      { id: 3, name: "Sarah Lee", email: "sarah.lee@example.com", phone: "555-123-4567", status: "Converted", source: "Referral" },
      { id: 4, name: "Michael Brown", email: "michael.brown@example.com", phone: "444-222-3333", status: "New", source: "LinkedIn" },
      { id: 5, name: "Emily Clark", email: "emily.clark@example.com", phone: "888-555-1111", status: "Follow-up", source: "Instagram" },
      { id: 6, name: "Alice Green", email: "alice.green@example.com", phone: "333-555-4444", status: "Converted", source: "Facebook" },
      { id: 7, name: "David Adams", email: "david.adams@example.com", phone: "222-777-8888", status: "New", source: "Google" },
      { id: 8, name: "Oliver White", email: "oliver.white@example.com", phone: "111-222-3333", status: "Follow-up", source: "LinkedIn" },
      { id: 9, name: "Sophia Harris", email: "sophia.harris@example.com", phone: "444-555-6666", status: "Converted", source: "Instagram" },
      { id: 10, name: "Lucas Clark", email: "lucas.clark@example.com", phone: "555-888-9999", status: "New", source: "Referral" },
    ];

    // Set mock leads data to state
    setLeads(mockLeads);
  }, []);

  // Pagination Logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    
    <div className="container ">
          <div className="row box-shadow-common p-3">
      {/* Bootstrap Breadcrumb */}
      <nav aria-label="breadcrumb mb-0" className="Lead-bred-wrapper">
        <ol className="breadcrumb  mb-0">
          <li className="breadcrumb-item"><Link to="/employee/Dashboard"> <i className="fa-solid fa-house-chimney"></i> Home</Link></li>
          &nbsp;
          <li className="breadcrumb-item active" aria-current="page">
          <i className="fas fa-users"></i> &nbsp;  Leads
          </li>
        </ol>
      </nav>
    </div>
    </div>
    
    
    <div className="container mt-5 p-3 box-shadow-common">
      <div className="d-flex justify-content-between align-items-center">
      <h5 className="text-start mb-4">Leads List</h5>
      <div className="">
                                    <div className="mb-3">
                                    <div className="input-group mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search"
    aria-label="Recipient's username"
    aria-describedby="basic-addon2"
  />
  <span className="input-group-text" id="basic-addon2">
  <i className="fa-solid fa-magnifying-glass"></i>
  </span>
</div>


</div>
                                    </div>
                                    </div>
      <div className="table-responsive leads-table-wrapper">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Seller Name</th>
              <th>project Name</th>
              <th>Status</th>
         
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>
              
                    {lead.status}
                 
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          {Array.from(
            { length: Math.ceil(leads.length / leadsPerPage) },
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
    </div>
    </>
  );
};

export default Leads;

