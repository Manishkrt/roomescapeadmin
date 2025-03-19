import {  createContext, useEffect, useState } from "react";
import api from "../api/api";


export const PublicHolidayContext = createContext()

export const PublicHolidayProvider = ({children})=>{

    const [publicHoliday, setPublicHoliday] = useState([])
    const [loadingFetchPublicHoliday, setLoadingFetchPublicHoliday] = useState(false)
 
    const getPublicHolidayFunc = async()=>{
        setLoadingFetchPublicHoliday(true)
        try {
            const response = await api.get("/public-holiday/all"); 
            setPublicHoliday(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchPublicHoliday(false)
        }
    }
    useState(()=>{
        getPublicHolidayFunc()
    }, []) 

    return(
        <PublicHolidayContext.Provider value={{setPublicHoliday, publicHoliday, loadingFetchPublicHoliday, getPublicHolidayFunc}}>
            {children}
        </PublicHolidayContext.Provider>
    )
}