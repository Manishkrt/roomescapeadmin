import {  createContext, useEffect, useState } from "react";
import api from "../api/api";


export const TimeSlotContext = createContext()

export const TimeSlotProvider = ({children})=>{

    const [timeSlot, setTimeSlot] = useState([])
    const [loadingFetchTimeSlot, setLoadingFetchTimeSlot] = useState(false)

    const getTimeSlotFunc = async()=>{
        setLoadingFetchTimeSlot(true) 
        try {
            const response = await api.get("/time-slot/all");  
            setTimeSlot(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchTimeSlot(false)
        }
    }
    useState(()=>{
        getTimeSlotFunc()
    }, [])
    return(
        <TimeSlotContext.Provider value={{setTimeSlot, timeSlot, loadingFetchTimeSlot, getTimeSlotFunc}}>
            {children}
        </TimeSlotContext.Provider>
    )
}