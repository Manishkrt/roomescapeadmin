import {  createContext, useEffect, useState } from "react";
import api from "../api/api"; 
export const GameContext = createContext()

export const GameProvider = ({children})=>{

    const [game, setGame] = useState([])
    const [loadingFetchGame, setLoadingFetchGame] = useState(false) 

    const getGameFunc = async()=>{
        setLoadingFetchGame(true)
        try {
            const response = await api.get("/game/all"); 
            setGame(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchGame(false)
        }
    }
    useState(()=>{
        getGameFunc()
    }, [])
    return(
        <GameContext.Provider value={{setGame, game, loadingFetchGame, getGameFunc}}>
            {children}
        </GameContext.Provider>
    )
}