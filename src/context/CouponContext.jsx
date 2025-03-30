import {  createContext, useEffect, useState } from "react";
import api from "../api/api";


export const CouponContext = createContext()

export const CouponProvider = ({children})=>{

    const [coupon, setCoupon] = useState([])
    const [loadingFetchCoupon, setLoadingFetchCoupon] = useState(false)
 
    const getCouponFunc = async()=>{
        setLoadingFetchCoupon(true)
        try {
            const response = await api.get("/coupon/all"); 
            setCoupon(response.data); 
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchCoupon(false)
        }
    }

    const updateCouponStatus = async(couponId, status)=>{
        if(!couponId)return
        try {
            const response = await api.put(`/coupon/update-status/${couponId}` , {status}); 
            if(response.status == 200){
                getCouponFunc()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useState(()=>{
        getCouponFunc()
    }, []) 

    return(
        <CouponContext.Provider value={{coupon, loadingFetchCoupon, getCouponFunc, updateCouponStatus}}>
            {children}
        </CouponContext.Provider>
    )
}