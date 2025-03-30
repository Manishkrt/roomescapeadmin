import {  createContext, useEffect, useState } from "react";
import api from "../api/api"; 
export const BookingContext = createContext()

const today = new Date().toISOString().split('T')[0];

const getISTDate = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(now.getTime() + istOffset); // Convert UTC to IST
    
    return istTime.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

export const BookingProvider = ({children})=>{

    const [booking, setBooking] = useState([])
    const [singleDateBooking , setSingleDateBooking ] = useState([])
    // const [date, setDate] = useState(getISTDate())
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [loadingFetchBooking, setLoadingFetchBooking] = useState(false)  

  

    const getBookingByDate = async()=>{ 
        setLoadingFetchBooking(true)
        try {
            if(!date){
                return
            } 
            const response = await api.post("/booking/get-by-date", {date});  
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
            const response = await api.get(`/cancel-booking/cancel/${bookingId}`) 
            if(response.status == 200){
                getBookingByDate()
                return true
            }
            return
            
        } catch (error) {
            console.log(error);
            return
        }
    }

    const updatePlayerReachedFunc = async(bookingId)=>{
        try { 
            const response = await api.get(`/booking/update-player-reached/${bookingId}`) 
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
        <BookingContext.Provider value={{singleDateBooking, loadingFetchBooking, setDate, cancelBookingFunc, getBookingByDate, date, updatePlayerReachedFunc }}>
            {children}
        </BookingContext.Provider>
    )
}
