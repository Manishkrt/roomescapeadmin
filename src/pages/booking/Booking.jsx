import React, { useEffect, useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';

import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { useBooking, useTimeSlot } from '../../customHook/customHook';
import api from '../../api/api';
import Swal from 'sweetalert2';

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
  timeSlotId: '67a3c503473caddc1c1d82a7',
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
  bookingBy: "client"
}


const bookingDataByAdminBooking = {
  bookingBy: "admin",
  couponCode: "flat200",
  createdAt: "2025-03-26T07:24:51.327Z",
  discountPrice: 200,
  email: "ravi@testing.com",
  finalPrice: 3050,
  name: "ravi kumar",
  numberOfPeople: 5,
  paymentType: "cash",
  phone: "1234567890",
  totalPrice: 3250,
  transactionId: "",
  updatedAt: "2025-03-26T07:24:51.327Z",
}



const Booking = () => {
  // State to track the active tab
  const { setDate, singleDateBooking, loadingFetchBooking, cancelBookingFunc, getBookingByDate, date, updatePlayerReachedFunc } = useBooking()
  const { timeSlot } = useTimeSlot()
  const [activeTab, setActiveTab] = useState("booking-table");

  const [currentPageTotalBooking, setCurrentPageTotalBooking] = useState(1);
  const [totalPagesTotalBooking, setTotalPagesTotalBooking] = useState(1);
  const [totalBookingNumber, setTotalBookingNumber] = useState(0)
  const [totalBookingData, setTotalBookingData] = useState([])
  const [totalBookingLimit, setTotalBookingLimit] = useState(20)
  const [totalBookingLoading, setTotalBookingLoading] = useState(false)
  const [totalBookingDate, setTotalBookingDate] = useState("")


  const bookingCancelFunc = (bookingId) => {
    Swal.fire({
      title: "Are you sure to cancel Booking?",
      text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, Cancel Booking!"
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingFunc(bookingId)
        Swal.fire({
          title: "Canceled!",
          text: "Booking has been canceled.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  const confirmPlayerReachedFunc = (bookingId, isPlayerReached) => {
    if (isPlayerReached) return
    Swal.fire({
      title: "Are you sure to Confirm Booking?",
      text: "You won't be able to revert this! it mean Player has reached to play game and you have collect Remaining Payment.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      // cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Confirm!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updatePlayerReachedFunc(bookingId)
        if (response) {
          Swal.fire({
            title: "Confirmed!",
            text: "Booking has been confirmed.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
    // updatePlayerReachedFunc(bookingId)
  }

  const changeDateFunc = (e) => {
    const value = e.target.value
    console.log("value", value);
    setDate(value)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const options = { timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    const today = new Date();
    const todayIST = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    if (
      date.getDate() === todayIST.getDate() &&
      date.getMonth() === todayIST.getMonth() &&
      date.getFullYear() === todayIST.getFullYear()
    ) {
      return `Today, ${formattedDate}`;
    }

    return formattedDate;
  };


  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const isFutureOrTodayDate = (bookingDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time for accurate comparison

    const booking = new Date(bookingDate);
    booking.setHours(0, 0, 0, 0); // Reset booking date's time

    return booking >= today; // Show button only if booking date is today or in the future
  };

  const fetchDataFunc = async () => {
    if (activeTab == "booking-table") {
      setCurrentPageTotalBooking(1)
      setTotalPagesTotalBooking(1)
      setTotalBookingNumber(0)
      setTotalBookingData([])
      return
    }
    if (activeTab == "total-booking") {
      setTotalBookingLoading(true)
      try {
        const response = await api.get(`/booking/all-booking?page=${currentPageTotalBooking}&limit=${totalBookingLimit}&bookingDate=${totalBookingDate}`)
        if (response.status == 200) {
          setCurrentPageTotalBooking(response.data.currentPage)
          setTotalPagesTotalBooking(response.data.totalPages)
          setTotalBookingNumber(response.data.total)
          setTotalBookingData(response.data.data)
        } 
      } catch (error) {
        console.log(error); 
      }finally{
        setTotalBookingLoading(false)
      }
      return
    }
    

  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPagesTotalBooking) {
      setCurrentPageTotalBooking(newPage);
    }
  };

  useMemo(() => {
    fetchDataFunc();
  }, [currentPageTotalBooking, totalBookingLimit, activeTab, totalBookingDate]);

  
  useEffect(() => {
    getBookingByDate()
  }, [])

  const formatDateTotalBooking = (isoDate) => {
    const date = new Date(isoDate); 
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap box-shadow-common-strip p-3 mb-3">

        <p className='mb-0'>{formatDate(date)}</p>
        <h5 className='mb-0'>Booking</h5>

        <Link to={'/create-booking'}
          className="text-white d-inline-block text-decoration-none rounded px-3 py-1 bg-escape"
        >
          <i className="fa-solid fa-clipboard-list"></i> &nbsp; Create New Booking
        </Link>
      </div>
      <div className=" container Main-leaves-wrapper ">
        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(selectedKey) => setActiveTab(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="booking-table" className='' >Booking Table &nbsp;<i className="fa-solid fa-clipboard-list"></i></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="total-booking">Total Booking &nbsp;<i className="fa-solid fa-users"></i>
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="total-bookingByDate">Booking Date Wise <i className="fa-solid fa-hourglass-half"></i></Nav.Link>
          </Nav.Item> */}
        </Nav>

        {/* Tab Content */}
        <div className="tab-content pt-4">

          {activeTab === "booking-table" && (
            <div >
              <div className='row'>
                <div className="col-3">
                  <input
                    type="date"
                    className="form-control"
                    onChange={e => changeDateFunc(e)}
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={(e) => e.target.showPicker()}
                  />
                </div>
              </div>
              {singleDateBooking?.length > 0 ?
                <div className='table-responsive'>
                  <table className='table table-bordered'>
                    <tbody>

                      <tr>
                        <td>Name Of Games</td>
                        {timeSlot.map((value) => (
                          <th key={value.startTime}>{convertTo12HourFormat(value.startTime)}</th>
                        ))}

                      </tr>
                      {singleDateBooking.map((gameValue) => (
                        <tr key={gameValue._id}>
                          <th className='text-capitalize'>{gameValue.name}</th>
                          {gameValue.timeSlots.map((timeValue) => (
                            <td key={timeValue._id}>
                              {timeValue.bookings.length > 0 ? timeValue.bookings?.map((bookingValue, index) => {
                                return (
                                  <div key={index}>

                                    <div className="d-flex justify-content-between">
                                      <p className='text-capitalize mb-1'>{bookingValue.name}</p>
                                      <span className='border rounded-circle d-flex justify-content-center align-items-center' style={{ width: "20px", height: "20px" }}>{bookingValue.numberOfPeople}</span>
                                    </div>
                                    <p className='mb-0'>{bookingValue.email}</p>
                                    <p className='mb-1'>{bookingValue.phone}</p>

                                    <div className=''>
                                      <p className='mb-0'>Final Price : {bookingValue.finalPrice}</p>

                                      {bookingValue.bookingBy == "admin" ?
                                        <span className='text-success'>Full Paid</span>
                                        :
                                        <div>
                                          <p className='mb-0'>Advance Pay : {bookingValue.advancePay}</p>
                                          <p className='mb-0'>  {bookingValue.finalPrice > bookingValue.advancePay ?
                                            <p className='mb-0'> Remaining :
                                              <span className='text-danger'>{bookingValue.finalPrice - bookingValue.advancePay}</span>
                                            </p> :
                                            <span className='text-success'>Full Paid</span>}
                                          </p>
                                        </div>
                                      }
                                      <div>
                                        <span
                                          className={`switch-button rounded-pill border-secondary border ${bookingValue.playerReached ? "active" : ""}`}
                                          disabled={bookingValue.playerReached}
                                          onClick={() => confirmPlayerReachedFunc(bookingValue.bookingId, bookingValue.playerReached)}
                                        />
                                      </div>

                                      {!bookingValue.playerReached && isFutureOrTodayDate(date) && (
                                        <div>
                                          <button className='btn btn-danger btn-sm px-2 py-0' disabled={bookingValue.playerReached} onClick={() => bookingCancelFunc(bookingValue.bookingId)}>
                                            Cancel
                                          </button>
                                        </div>
                                      )}
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
          {activeTab === "total-booking" && (
            <div>
              <div className='row justify-content-between mb-3 '>
                <div className="col-3">
                  <input
                    type="date"
                    className="form-control"
                    value={totalBookingDate}
                    onChange={(e) => setTotalBookingDate(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={(e) => e.target.showPicker()}
                  />
                  {totalBookingDate ? 
                  <button className='btn btn-danger' onClick={()=>setTotalBookingDate("")}>Reset Date</button> : null }

                </div>
                <p className=' col-6 text-end mb-0'>
                  Total Booking : {totalBookingNumber}
                  <span>
                    <select value={totalBookingLimit} onChange={e => setTotalBookingLimit(e.target.value)}>
                      
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </span>
                </p>
              </div>


              <Table responsive striped bordered hover>

                <thead className='text-center'>
                  <tr>
                    <th> Booking Date</th>
                    <th>Game</th>
                    <th>Time Slot</th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Total Player</th>
                    <th>FinalPrice</th>
                    <th>Advance Pay</th>
                    <th>bookingBy</th>

                    

                  </tr>
                </thead>
                <tbody className='text-center'>
                  {totalBookingLoading ? 
                  <tr>
                    <td colSpan={9}>Loading</td>
                  </tr> : 
                  totalBookingData.length > 0 ? 
                  totalBookingData.map((value) => (
                    <tr key={value._id}>
                      <td>{formatDateTotalBooking(value.bookingDate)}</td>
                      <td className='text-capitalize'>{value?.game?.name}</td> 
                      <td>{convertTo12HourFormat(value.timeSlot)}</td>
                      <td className='text-capitalize'>{value.name}</td>
                      <td>{value.phone}</td>
                      <td>{value.numberOfPeople}</td>
                      <td>{value.finalPrice}</td>
                      <td>{value.advancePay ? value.advancePay : "-"}</td>
                      <td>{value.bookingBy == "admin" ? "Admin Pannel" : "Website"}</td>
                    </tr>
                  )) :
                  <tr>
                    <td colSpan={9}>No Data Found</td>
                  </tr>
                }
                </tbody>
              </Table>

              {totalPagesTotalBooking > 1 ?
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-primary me-2"
                    disabled={currentPageTotalBooking === 1 || totalBookingLoading}
                    onClick={() => handlePageChange(currentPageTotalBooking - 1)}
                  >
                    Previous
                  </button>
                  <span className="align-self-center">Page {currentPageTotalBooking} of {totalPagesTotalBooking}</span>
                  <button
                    className="btn btn-primary ms-2"
                    disabled={currentPageTotalBooking === totalPagesTotalBooking || totalBookingLoading}
                    onClick={() => handlePageChange(currentPageTotalBooking + 1)}
                  >
                    Next
                  </button>
                </div> : null}
            </div>
          )}
          {activeTab === "total-bookingByDate" && (
            <div>
              <div className='row'>
                <div className="col-3">
                  <input
                    type="date"
                    className="form-control"
                    onChange={e => changeDateFunc(e)}
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={(e) => e.target.showPicker()}
                  />
                </div>
              </div>
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
