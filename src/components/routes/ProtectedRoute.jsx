
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Sidebar from "../../layout/Sidebar/Sidebar";
import ContentTop from "../../layout/ContentTop/ContentTop";
import { useProfile } from "../../customHook/useProfile";
const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const {setProfile} = useProfile()
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/admin/profile"); 
        setProfile(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);
      }
    };

    fetchProfile();
  }, [setProfile]);

  if (isAuthenticated === null) return <h2>Loading...</h2>;
  return isAuthenticated ?
    <>
      <Sidebar /> 
      <div className="content">
        <div className='main-content border-bottom' style={{padding: "10px 20px"}}>
          <ContentTop />
        </div>
        <div style={{padding: "20px", height : "calc(100vh - 130px)", overflow: "auto"}} className="shadow shadow-lg rounded border m-3">
          <Outlet />
        </div>
      </div> 
    </>

    : <Navigate to="/login" />;
};

export default PrivateRoute;
