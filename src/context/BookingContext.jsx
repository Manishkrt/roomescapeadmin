import {  createContext, useEffect, useState } from "react";
import api from "../api/api"; 
export const BookingContext = createContext()

const today = new Date().toISOString().split('T')[0];

export const BookingProvider = ({children})=>{

    const [booking, setBooking] = useState([])
    const [singleDateBooking , setSingleDateBooking ] = useState([])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [loadingFetchBooking, setLoadingFetchBooking] = useState(false)  

  

    const getBookingByDate = async()=>{ 
        setLoadingFetchBooking(true)
        try {
            if(!date){
                return
            }
            const response = await api.post("/booking/get-by-date", {date}); 
            console.log("response find booking by date", response.data);
            setSingleDateBooking(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchBooking(false)
        }
    }

    const cancelBookingFunc = async(bookingId)=>{
        try {
            // console.log("booking Id", bookingId);
            const response = await api.get(`/cancel-booking/cancel/${bookingId}`)
            // console.log("response", response);
            if(response.status == 200){
                getBookingByDate()
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getBookingByDate()
    }, [date]) 
    return(
        <BookingContext.Provider value={{singleDateBooking, loadingFetchBooking, setDate, cancelBookingFunc }}>
            {children}
        </BookingContext.Provider>
    )
}
