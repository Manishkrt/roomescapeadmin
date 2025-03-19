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
        console.log("change date");
        
        setLoadingFetchBooking(true)
        try {
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
    useEffect(()=>{
        getBookingByDate()
    }, [date]) 
    return(
        <BookingContext.Provider value={{singleDateBooking, loadingFetchBooking, setDate }}>
            {children}
        </BookingContext.Provider>
    )
}
