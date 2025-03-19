import {  createContext, useEffect, useState } from "react";


export const ProfileContext = createContext()

export const ProfileProvider = ({children})=>{

    const [profile, setProfile] = useState({})

    
    return(
        <ProfileContext.Provider value={{setProfile, profile}}>
            {children}
        </ProfileContext.Provider>
    )
}