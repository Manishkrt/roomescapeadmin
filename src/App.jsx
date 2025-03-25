import "./App.css"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContentMain from "./components/ContentMain/ContentMain";

import Login from "./components/Login/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import Leaves from "./components/Pages/Leaves";

import { SidebarContext } from "./context/sidebarContext";
import EmployeeView from "./components/Pages/EmployeeView";
import AddAtendence from "./components/Pages/Attendence/AddAtendence"; 
// import Addblogs from "./components/blogs/Addblogs";
import BlogList from "./components/blogs/BlogList"; 
import Leads from "./components/Leads"; 
import CategoryEdit from "./components/Pages/CategoryEdit"; 
import axios from "axios";
import { useContext, useEffect } from "react";
import { url } from "./components/URL/Url";
import NewProject from "./components/NewProject/NewProject";
import BlogEdit from "./components/blogs/BlogEdit";
import PropertyUpdate from "./components/property/PropertyUpdate";
import VerifyOtp from "./components/Login/VerifyOtp";
import PublicRoute from "./components/routes/PublicRoute";
import Profile from "./components/Pages/Profile";
import GameList from "./pages/game/GameList";
import Pricing from "./pages/pricing/Pricing";
import PublicHoliday from "./pages/PublicHolidays";
import TimeSlot from "./pages/TimeSlot";
import AddGame from "./pages/game/AddGame";
import EditGame from "./pages/game/EditGame";
import AddBlogs from "./pages/blog/AddBlogs";
import Blog from "./pages/blog/Blogs";
import EditBlogs from "./pages/blog/EditBlogs";
import Booking from "./pages/booking/Booking";
import AddBooking from "./pages/booking/AddBooking";
import CouponCodePage from "./pages/Coupon";
import BulkBookingList from "./pages/BulkBooking";
import AddEvent from "./pages/event/AddEvent";
import EventList from "./pages/event/EventList";
import EventDetails from "./pages/event/EventDetails";
import UpdateEvent from "./pages/event/UpdateEvent";
import Offer from "./pages/offer/Offer";
import BlockGameList from "./pages/BlockGame/BlockGameList";
import AddBlockGame from "./pages/BlockGame/AddBlockGame";
import GameReview from "./pages/GameReview/GameReview";
import AddGameReview from "./pages/GameReview/AddGameReview";

function App() {
  const {
    SetCategory,
    SetCategoryType,
    blogs,
    setBlogs,
    loading,
    setLoading,
    setProjects,
  } = useContext(SidebarContext);

  const GetCategories = async () => {
    const response = await axios.get(`${url}/getAllCategory`);
    SetCategory(response.data.resultdata);
  };
  const GetCategoriesType = async () => {
    const response = await axios.get(`${url}/api/getAlltype`);
    // SetCategory(response.data.result)
    SetCategoryType(response.data.result);
  };

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${url}/api/getblogs`);

      if (response.data && response.data.length > 0) {
        setBlogs(response.data);
      } else {
        setBlogs([]); // No blogs available
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Handle error by setting blogs to empty
    } finally {
      setLoading(false);
    }
  };

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${url}/api/project/get/all`);
      if (response.data && response.data.length > 0) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   GetCategories();
  //   GetCategoriesType();
  //   getAllBlogs();
  //   getAllProjects();
  // }, []);

  return (
    <div className="app">
      <Routes> 
        <Route path="/" element={<ProtectedRoute />}> 
          <Route index element={<ContentMain />} />  
          
          {/* Booking route  */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/create-booking" element={<AddBooking />} />

          {/* Block game route  */}
          <Route path="/block-game-list" element={<BlockGameList />} />
          <Route path="/add-block-game" element={<AddBlockGame />} />

          {/* offer banner  */}
          <Route path="/offer" element={<Offer />} />

          


          {/* game route  */}
          <Route path="/add-new-game" element={<AddGame />} /> 
          <Route path="/edit-game/:id" element={<EditGame />} />
          <Route path="/game-list" element={<GameList />} />


          {/* game route  */}
          <Route path="/add-game-review" element={<AddGameReview />} /> 
          <Route path="/edit-game-review/:id" element={<AddGameReview />} />
          <Route path="/game-review" element={<GameReview />} />

          {/* Pricing route  */}
          {/* <Route path="/Addblogs" element={<Addblogs />} />  */}
          {/* <Route path="/BlogEdit/:id" element={<BlogEdit />} /> */}
          <Route path="/price-list" element={<Pricing />} />

          {/* public holiday route  */} 
          <Route path="/public-holidays" element={<PublicHoliday />} /> 
          {/* time slot route  */} 
          <Route path="/time-slot" element={<TimeSlot />} />
          {/* coupon route  */} 
          <Route path="/coupon" element={<CouponCodePage />} />

          {/* blog route  */}
          <Route path="/add-blog" element={<AddBlogs />} /> 
          <Route path="/BlogEdit/:id" element={<EditBlogs />} />
          <Route path="/blogs" element={<Blog />} />

          {/* bulk booking route  */}
          <Route path="/bulk-booking" element={<BulkBookingList />} />

          {/* event list route  */}
          <Route path="/event-list" element={<EventList />} />
          <Route path="/add-new-event" element={<AddEvent />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/update-event/:eventId" element={<UpdateEvent />} />






          <Route path="/leaves" element={<Leaves />} /> 
          <Route path="/Leads" element={<Leads />} /> 
          <Route path="/Category/:id" element={<CategoryEdit />} />
          
 
          <Route path="/admin/newproject" element={<NewProject />} />
          {/* <Route path="/Employee" element={<Employee />} /> */}

          <Route path="/profile" element={<Profile />} />
          <Route path="/employeeview/:id" element={<EmployeeView />} />


          <Route path="/addAtendence" element={<AddAtendence />} />
          <Route path="/update/property/:id" element={<PropertyUpdate />} />
        </Route>
        {/* </Route> */}
        {/* <Route element={<PublicRoute />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route> */} 
          <Route path="/Login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} /> 
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
