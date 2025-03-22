import {  createContext, useEffect, useState } from "react";
import api from "../api/api"; 
export const BlogContext = createContext()

export const BlogProvider = ({children})=>{

    const [blog, setBlog] = useState([])
    const [loadingFetchBlog, setLoadingFetchBlog] = useState(false) 

    const getBlogFunc = async()=>{
        setLoadingFetchBlog(true)
        try {
            const response = await api.get("/blog/all"); 
            setBlog(response.data);
        } catch (error) {
            console.log(error); 
        }
        finally{
            setLoadingFetchBlog(false)
        }
    }
    useState(()=>{
        getBlogFunc()
    }, [])
    return(
        <BlogContext.Provider value={{setBlog, blog, loadingFetchBlog, getBlogFunc}}>
            {children}
        </BlogContext.Provider>
    )
}