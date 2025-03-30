

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2 
import { url } from "../../components/URL/Url";
import TextEditor from "../../components/TextEditor";
import api from "../../api/api";
import { useGame } from "../../customHook/customHook";
import CustomTimeSlotDropdown from "../../components/CustomTimeSlotDropdown";
import { Link, useNavigate } from "react-router-dom";

const initialValue = {
    game: "",
    bookingDate: "",
    timeSlot: "",
    numberOfPeople: "",
    paymentType: "",
    name: "",
    email: "",
    phone: "",
    bookingBy: "admin",
    transactionId: "",
    couponCode: "",
    timeSlotId: ""
}



const AddBooking = () => {
    const { game } = useGame()
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState(initialValue)
    const [loading, setLoading] = useState(false);
    const [availableSlot, setAvailableSlot] = useState([])
    const [selectedGame, setSelectedGame] = useState()
    const [peopleCountErr, setPeopleCountErr] = useState("")
    const [timeSlotErr, setTimeSlotErr] = useState("")
    const [priceData, setPriceData] = useState()
    const [couponCode, setCouponCode] = useState("")
    const [couponMessage, setCouponMessage] = useState("")
    const [selectedTimeSlot, setselectedTimeSlot] = useState("")

    const [dateErrMsg, setDateErrMsg] = useState('')



    const formHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFormValue({ ...formValue, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeSlotErr('')
        if (!formValue.timeSlot) {
            return setTimeSlotErr('Choose a Time Slot')
        }
        const BookingData = { ...formValue, timeSlotId: selectedTimeSlot, totalPrice: priceData.totalPrice, finalPrice: priceData.finalPrice, discountPrice: priceData.discountAmount }

        setLoading(true);
        try {
            const response = await api.post(`/booking/booking-by-admin`, BookingData);
            if (response.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Bookin successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                setFormValue(initialValue)
                navigate('/booking')
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

    const checkTimeSlotFunc = async () => {
        setDateErrMsg('')
        if (formValue.game && formValue.bookingDate) {
            try { 
                const response = await api.post('/booking/chek-slot-available', { game: formValue.game, bookingDate: formValue.bookingDate })

                if (!response.status == 200) {
                    return
                }
                setAvailableSlot(response.data.availableSlots)

            } catch (error) {
                console.log(error); 
                if(error.status == 400){
                    setDateErrMsg(error.response.data.message) 
                    setAvailableSlot([])
                    console.log("done", error.response.data.message); 
                }
            }
        }
    }
    const checkPriceFunc = async () => {
        if (formValue.numberOfPeople && formValue.bookingDate) {
            setCouponMessage("")
            const response = await api.post('/booking/chek-price', { numberOfPeople: formValue.numberOfPeople, bookingDate: formValue.bookingDate, couponCode })
            if (!response.status == 200) {
                return
            }
            setPriceData(response.data)
        }
        else {
            setPriceData()
        }
    }
    const applyCouponFunc = async (e) => {
        setCouponMessage("")
        if(!formValue.couponCode){
            Swal.fire({
                // title: "Enter Coupon Code before apply",
                text: "enter coupon code before apply",
                icon: "question"
            });
            return
        }
        if (!formValue.numberOfPeople || !formValue.bookingDate) {
            Swal.fire({
                title: "Need to fill form",
                text: "Before apply coupon please fill the form",
                icon: "question"
            });
            return
        }
        const response = await api.post('/booking/chek-price', { numberOfPeople: formValue.numberOfPeople, bookingDate: formValue.bookingDate, couponCode: formValue.couponCode })
        if (!response.status == 200) {
            return
        }
        setCouponMessage(response.data.message)
        setPriceData(response.data)
    }

    const setSelectedGameFunc = () => {
        if (game && formValue.game) {
            const response = game.find(d => d._id == formValue.game)
            if (response) {
                setSelectedGame(response)
                setFormValue({ ...formValue, "numberOfPeople": "" })
            }
        }
    }

    const checkPeopleCountWithTimeSlot = () => {
        setPeopleCountErr('')
        if (!formValue.timeSlot || !formValue.numberOfPeople) {
            return
        }
        const response = availableSlot.find(d => d.timeSlot == formValue.timeSlot)
        if (response) {
            const isAvailable = Number(response.remainingSlots) - (Number(formValue.numberOfPeople))
            if (isAvailable < 0) {
                setPeopleCountErr(`No seet Available`)
            }
        }

    }

    useEffect(() => {
        checkTimeSlotFunc()
    }, [formValue.game, formValue.bookingDate])

    useEffect(() => {
        setSelectedGameFunc()
    }, [formValue.game])

    useEffect(() => {
        checkPeopleCountWithTimeSlot()
    }, [formValue.timeSlot, formValue.numberOfPeople])
    useEffect(() => {
        checkPriceFunc()
    }, [formValue.bookingDate, formValue.numberOfPeople])
    return (
        <div className="container mt-2 box-shadow-common p-5 add-blogwrapper">
            <Link to='/booking' className="text-decoration-none sidebarcolor  text-white p-2 rounded-2"><i className="fa-solid fa-arrow-left-long"></i></Link>

            <h5 className="text-center mb-4">Create New Booking</h5>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Title */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">
                            Choose Game
                        </label>
                        <select name="game" id="" className="form-select" defaultValue="" onChange={(e) => formHandle(e)} required>
                            <option value="" disabled >Choose</option>
                            {game.map((value) => (
                                <option key={value._id} value={value._id} >{value.name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    {/* Image Alt Text */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="bookingDate" className="form-label">
                            Booking Date
                        </label>
                        <small className="text-danger text-capitalize  d-block mb-0" style={{fontSize : "12px"}}>{dateErrMsg}</small>
                        <input
                            type="date"
                            className="form-control"
                            id="bookingDate"
                            name="bookingDate"
                            value={formValue.bookingDate}
                            onChange={(e) => formHandle(e)}
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="" className="form-label">
                            Choose Time Slot {timeSlotErr ? <small className="text-danger">({timeSlotErr})</small> : null}
                        </label>
                        <CustomTimeSlotDropdown availableSlot={availableSlot} formHandle={formHandle} setTimeSlotErr={setTimeSlotErr} setselectedTimeSlot={setselectedTimeSlot} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="numberOfPeople" className="form-label">
                            Number Of People {peopleCountErr && <small className="text-danger">({peopleCountErr})</small>}
                        </label>

                        <select className="form-select" name="numberOfPeople" value={formValue.numberOfPeople} onChange={(e) => formHandle(e)} required>
                            <option value="" disabled >Choose</option>
                            {selectedGame ? Array.from({ length: selectedGame.maxParticipent - selectedGame.minParticipent + 1 }, (_, i) => selectedGame.minParticipent + i).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            )) : null}
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="paymentType" className="form-label">
                                    Payment Type
                                </label>

                                <select className="form-select" name="paymentType" value={formValue.paymentType} onChange={(e) => formHandle(e)} required>
                                    <option value="" disabled >Choose</option>
                                    <option value="cash"  >Cash</option>
                                    <option value="online" >Online</option>
                                </select>
                            </div>

                            {formValue.paymentType == "online" ?
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="transactionId" className="form-label">
                                        Transaction Id
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transactionId"
                                        name="transactionId"
                                        placeholder="Enter TransactionId"
                                        value={formValue.transactionId}
                                        onChange={(e) => formHandle(e)}
                                         
                                    />

                                </div> : null}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            value={formValue.name}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formValue.email}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formValue.phone}
                            onChange={(e) => formHandle(e)}
                            required
                        />
                    </div>


                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="couponCode" className="form-label">
                                    Apply Coupon
                                </label>
                                <p>{couponMessage == "Coupon code applied successfully" ?
                                    <span className="text-success">{couponMessage}</span> :
                                    <span className="text-danger"> {couponMessage}</span>}</p>
                                <div className="d-flex gap-3 align-items-center">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="couponCode"
                                        name="couponCode"
                                        placeholder="Enter Coupon Code"

                                        value={formValue.couponCode}
                                        onChange={(e) => formHandle(e)}
                                        
                                    />
                                    <button className="btn btn-success px-4" type="button" onClick={applyCouponFunc}>
                                        Apply
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    {priceData ?
                        <div className="d-flex justify-content-end mb-4">
                            <div>
                                {priceData.totalPrice - priceData.finalPrice ?
                                    <div className="mb-1">
                                        <span className="fw-bold text-muted"> Price : </span>
                                        <span className="text-decoration-line-through">&#8377; {priceData.totalPrice} </span>
                                    </div>
                                    : null}

                                {priceData.totalPrice - priceData.finalPrice ?
                                    <div className="mb-1">
                                        <span className="fw-bold text-muted">Total Discount  : </span>
                                        <span className="">&#8377; {priceData.discountAmount} </span>
                                    </div>
                                    : null}

                                <div className="mb-1">
                                    <span className="fw-bold text-muted">Final Price : </span>
                                    <span className="">&#8377; {priceData.finalPrice} </span>
                                </div>




                            </div>
                        </div> : null}
                    <div className="col-md-12 text-end border-top pt-3">

                        <button type="submit" className="btn btn-primary add-blogs-button">
                            Create Booking
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

export default AddBooking;
