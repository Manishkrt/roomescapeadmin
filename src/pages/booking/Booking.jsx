import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { useBooking, useTimeSlot } from '../../customHook/customHook';
import api from '../../api/api';

const itemsPerPage = 4;

const vendorData = [
  { id: 1, active: 'Yes', Name: 'Madhav', Role: 'Administrator', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'madhavsingh.singh25@gmail.com', Phone: '7011004598' },
  { id: 2, active: 'No', Name: 'Anjali', Role: 'QAC Department', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'anjali@example.com', Phone: '7011004599' },
  { id: 3, active: 'Yes', Name: 'Ravi', Role: 'Moderator', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'ravi@example.com', Phone: '7011004600' },
  { id: 4, active: 'Yes', Name: 'Sita', Role: 'Administrator', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'sita@example.com', Phone: '7011004601' },
  { id: 5, active: 'No', Name: 'Rahul', Role: 'Account Department', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'rahul@example.com', Phone: '7011004602' },
  { id: 6, active: 'Yes', Name: 'Priya', Role: 'Marketing Department', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'priya@example.com', Phone: '7011004603' },
  { id: 7, active: 'Yes', Name: 'Vikram', Role: 'QAC Department', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'vikram@example.com', Phone: '7011004604' },
  { id: 8, active: 'No', Name: 'Geeta', Role: 'Account Department', startdate: "10-11-2024", enddate: "20-12-2024", totaldays: "40 Days", EmailId: 'geeta@example.com', Phone: '7011004605' },
];

const bookingData = {
  game: "67a77a0623623718690ea80f",
    bookingDate: "2025-03-28",
    timeSlot: "11:00",
    timeSlotId : '67a3c503473caddc1c1d82a7',
    numberOfPeople: 3,
    totalPrice: 2400,
    finalPrice: 2200,
    discountPrice: 200,
    advancePay: 1000,
    paymentType: "online",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "9876543210",
    couponCode: "flat200",
    bookingBy : "client"
}



const Booking = () => {
  // State to track the active tab
  const { setDate, singleDateBooking, loadingFetchBooking } = useBooking() 
  const { timeSlot } = useTimeSlot()
  const [activeTab, setActiveTab] = useState("link-2");
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const bookNowFunc = async()=>{
    try {
        const response = await api.post('/booking/booking-by-client', bookingData)
        console.log(response);
        
        // const response = await axios.post('http://localhost:8000/api/v1/booking/booking-by-client', bookingData)
    } catch (error) {
        console.log(error);
        
    }
}

  // Calculate the number of pages
  const totalPages = Math.ceil(vendorData.length / itemsPerPage);

  // Get the current data for the page
  const currentData = vendorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changeDateFunc = (e)=>{
    const value = e.target.value
    console.log("value", value);
    setDate(value)
  } 
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap box-shadow-common-strip p-3 mb-3">
        <button onClick={bookNowFunc}>bookNowFunc</button>
        <h5 className='mb-0'>Booking</h5>
        {/* <Button
          style={{ backgroundColor: 'rgb(202 77 77)', border: 'none' }}
          className="text-white"
          onClick={handleShow}
        >
          <i className="fas fa-layer-group"></i> Add New Holiday
        </Button> */}
        <Link to={'/create-booking'}
          className="text-white d-inline-block text-decoration-none rounded px-3 py-1 bg-escape"
         
          onClick={handleShow}
        >
          <i className="fa-solid fa-clipboard-list"></i> &nbsp; Create New Booking
        </Link>
      </div>
      <div className=" container Main-leaves-wrapper ">
        {/* Navigation Tabs */}
        <Nav
          // justify
          variant="tabs"
          activeKey={activeTab}
          onSelect={(selectedKey) => setActiveTab(selectedKey)} // Update active tab

        >
          <Nav.Item>
            <Nav.Link eventKey="link-2"className='' >Booking Table &nbsp;<i className="fa-solid fa-clipboard-list"></i></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/home">Total Booking &nbsp;<i className="fa-solid fa-users"></i>
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="link-1">Pending Leaves <i className="fa-solid fa-hourglass-half"></i></Nav.Link>
          </Nav.Item> */}

        </Nav>

        {/* Tab Content */}
        <div className="tab-content pt-4">
          <div className='row'>
            <div className="col-3">
            <input
                type="date"
                className="form-control"
                // placeholder="Search"
                onChange={e=>changeDateFunc(e)}
                // onChange={e=>setDate(e.target.value)}
                // aria-label="Recipient's username"
                // aria-describedby="basic-addon2"
              />
            {/* <div className="input-group mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Search"
                onChange={e=>setDate(e.target.value)}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div> */}
            </div>


          </div>
          {activeTab === "link-2" && (
            <div >
              {singleDateBooking?.length > 0 ?
                <div className='table-responsive'>
                  {/* {singleDateBooking.map((gameValue)=>)} */}
                  <table className='table table-bordered'>
                    <tbody>

                      <tr>
                        <td>Name Of Games</td>
                        {timeSlot.map((value) => (
                          <th key={value.startTime}>{value.startTime}</th>
                        ))}

                      </tr>
                      {singleDateBooking.map((gameValue) => (
                        <tr key={gameValue._id}>
                          <th className='text-capitalize'>{gameValue.name}</th>
                          {gameValue.timeSlots.map((timeValue) => (
                            <td key={timeValue._id}>
                              {/* <p>{timeValue.startTime}</p> */}
                              {/* <p>{timeValue.bookings.length}</p> */}
                              {timeValue.bookings.length > 0 ? timeValue.bookings?.map((bookingValue, index)=>{
                                return(
                                  <div key={index}>
                                      
                                      <div className="d-flex justify-content-between">
                                      <p className='text-capitalize'>{bookingValue.name}</p>
                                      <span className='border rounded-circle d-flex justify-content-center align-items-center' style={{width:"20px", height: "20px"}}>{bookingValue.numberOfPeople}</span>
                                      </div>
                                  </div>
                                )
                              }) : 
                              <div className='text-danger'>Null</div>
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                :
                <div>No Booking Found</div>}
            </div>
          )}
          {activeTab === "/home" && (
            <div>
              <div className="container mt-2">
                <div className="row p-0">
                  <div className="col-lg-3 p-0">
                    <div className="mb-3">
                      {/* <div className="input-group mb-3">
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
                      </div> */}


                    </div>
                  </div>
                </div>
              </div>


              <Table responsive striped bordered hover>

                <thead className='text-center'>
                  <tr>
                    <th> Id</th>

                    <th>Name</th>
                    <th>phone</th>
                    <th>Email</th>
                    <th>AMount</th>
                    <th>Game</th>
                    <th>Date of booking</th>
               
                    <th>Email ID</th>
                    <th>Phone</th>
                   
                    <th>#</th>

                  </tr>
                </thead>
                {/* <tbody className='text-center'>
                  {currentData.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.id}</td>

                      <td>{vendor.Name}</td>
                      <td>{vendor.Role}</td>
                      <td>{vendor.startdate}</td>
                      <td>{vendor.enddate}</td>
                      <td>{vendor.totaldays}</td>
                      <td>{vendor.EmailId}</td>
                      <td>{vendor.Phone}</td>

                      <td>
                        <Form>
                          <Form.Check
                            type="switch"
                            id={`custom-switch-${vendor.id}`}
                            checked={vendor.active === 'Yes'}
                            readOnly
                            className={vendor.active === 'Yes' ? 'switch-active' : 'switch-inactive'}
                          />
                        </Form>
                      </td>
                      <td>
                        <i className="fa-regular fa-pen-to-square"></i>&nbsp;&nbsp;
                        <i className="fa-solid fa-trash-can-arrow-up"></i>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </Table>
            </div>
          )}
          {activeTab === "link-1" && (
            <div>
              <h3>Loooonger NavLink Content</h3>
              <p>This is the content for the Loooonger NavLink tab.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Booking;
