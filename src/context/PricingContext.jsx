import {  createContext, useEffect, useState } from "react";
import api from "../api/api";


export const PricingContext = createContext()

export const PricingProvider = ({children})=>{

    const [pricing, setPricing] = useState([])
    const [loadingFetchPricing, setLoadingFetchPricing] = useState(false)

    const getPricingFunc = async()=>{
        setLoadingFetchPricing(true)
        try {
            const response = await api.get("/pricing/all-pricing"); 
            setPricing(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchPricing(false)
        }
    }
    useState(()=>{
        getPricingFunc()
    }, [])
    return(
        <PricingContext.Provider value={{setPricing, pricing, loadingFetchPricing}}>
            {children}
        </PricingContext.Provider>
    )
}