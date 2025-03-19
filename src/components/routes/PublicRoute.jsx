import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = () => {
  const token = Cookies.get("accessToken"); // Get token from cookies
//   console.log("token", token);
  

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
