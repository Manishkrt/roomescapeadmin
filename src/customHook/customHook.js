import { useContext } from "react"
import { ProfileContext } from "../context/ProfileContext"
import { GameContext } from "../context/GameContext"
import { PricingContext } from "../context/PricingContext"
import { PublicHolidayContext } from "../context/PublicHolidaysContext"
import { TimeSlotContext } from "../context/TimeSlot"
import { BlogContext } from "../context/BlogContext"
import { CouponContext } from "../context/CouponContext"
import { BookingContext } from "../context/BookingContext"

export const useProfile = ()=>{
    return useContext(ProfileContext)
}
export const useGame = ()=>{
    return useContext(GameContext)
}
export const usePricing = ()=>{
    return useContext(PricingContext)
}
export const usePublicHoliday = ()=>{
    return useContext(PublicHolidayContext)
}
export const useTimeSlot = ()=>{
    return useContext(TimeSlotContext)
}
export const useBlog = ()=>{
    return useContext(BlogContext)
}
export const useCoupon = ()=>{
    return useContext(CouponContext)
}
export const useBooking = ()=>{
    return useContext(BookingContext)
}