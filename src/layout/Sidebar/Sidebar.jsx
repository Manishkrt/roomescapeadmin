import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarContext } from '../../context/sidebarContext';
import './Sidebar.css'; // Ensure this CSS file includes the necessary styles
import { iconsImgs } from '../../utils/images'; // Update the path according to your project structure


const initialValueDropdown = {
  pricing : false,
  blog : false,
  publicHoliday : false,
  timeSlot : false,
  game : false,
}
const Sidebar = () => {
  const location = useLocation();
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext); 
  const [sidebarClass, setSidebarClass] = useState("");

  const [isWebSettingSubmenuOpen, setIsWebSettingSubmenuOpen] = useState(false); 
  const [isLeavessubmenuOpen, setIsLeavesSubmenuOpen]=useState(false)

  const [toggleDropdown, setToggleDropdown] = useState(initialValueDropdown)
  
  const toggleDropdownFucn = (value)=>{
    setToggleDropdown({...toggleDropdown , [value]:!toggleDropdown[value]})
  }
 

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  const toggleWebSettingSubmenu = () => {
    setIsWebSettingSubmenuOpen(!isWebSettingSubmenuOpen);
  }; 
  const toggleAttendence = () => {
    setIsLeavesSubmenuOpen(!isLeavessubmenuOpen);
  }; 

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className='text-end sidebarClose-Wrapper'>
        <i className="fa-solid fa-arrow-left text-white" onClick={toggleSidebar}></i>
      </div>
      <div className="user-info">
        <div className="info-img img-fit-cover text-center">
          <img src='/assets/img/escapelogo.webp' style={{width: "100px"}}/>
        </div>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className={`Customnav-link ${location.pathname === "/" ? 'active' : ''}`}>
            <i className="fa-solid fa-house-chimney"></i>
              <span className="Customnav-link-text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/booking" className={`Customnav-link ${location.pathname === "/booking" ? 'active' : ''}`}>
            <i className="fa-solid fa-clipboard-list"></i><span className="Customnav-link-text ms-1">Booking</span>
            </Link> 
          </li>

          <li className="nav-item">
            <Link to="/offer" className={`Customnav-link ${location.pathname === "/offer" ? 'active' : ''}`}>
            <i className="fa-solid fa-percent"></i>

              <span className="Customnav-link-text ms-1">Offer banner</span>
            </Link> 
          </li>
          <li className="nav-item">
            <Link to="/coupon" className={`Customnav-link ${location.pathname === "/coupon" ? 'active' : ''}`}>
            
            <i className="fa-solid fa-ticket-simple"></i>
              <span className="Customnav-link-text">Coupon Code</span>
            </Link>


          </li>
          <li className="nav-item">
            <Link to="/public-holidays" className={`Customnav-link ${location.pathname === "/public-holidays" ? 'active' : ''}`}>
             
            <i className="fa-solid fa-snowman"></i>
              <span className="Customnav-link-text">Public Holidays</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/time-slot" className={`Customnav-link ${location.pathname === "/time-slot" ? 'active' : ''}`}>
             
            <i className="fa-solid fa-clock"></i><span className="Customnav-link-text">Time Slot</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bulk-booking" className={`Customnav-link ${location.pathname === "/bulk-booking" ? 'active' : ''}`}> 
            {/* <i className="fa-solid fa-calendar-days"></i> */}
            <i className="fa-solid fa-calendar-plus"></i>

              <span className="Customnav-link-text">Bulk Booking</span>
            </Link>
          </li>

          {/* event dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('event')}>
             
            <i className="fa-solid fa-calendar-day"></i>
              <span className="Customnav-link-text ms-1">Event</span>
              <span className="submenu-indicator">
                {toggleDropdown.event ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.event ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/event-list" className={`Customnav-link common-submenu-text ${location.pathname === "/event-list" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-file-signature"></i>
                  <span className="Customnav-link-text">Event List</span>
                </Link>
                <Link to="/add-new-event" className={`Customnav-link common-submenu-text ${location.pathname === "/add-new-event" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-bullhorn"></i>

                  <span className="Customnav-link-text">Add Event</span>
                </Link>
             
              </li>
            </ul>
          </li>
          {/* game dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('game')}>
             
            <i className="fa-solid fa-gamepad"></i>
              <span className="Customnav-link-text">Games</span>
              <span className="submenu-indicator">
                {toggleDropdown.game ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.game ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/game-list" className={`Customnav-link common-submenu-text ${location.pathname === "/game-list" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-file-signature"></i>
                  <span className="Customnav-link-text">Game List</span>
                </Link>
                <Link to="/add-new-game" className={`Customnav-link common-submenu-text ${location.pathname === "/add-new-game" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-chess-board"></i>

                  <span className="Customnav-link-text">Add Game</span>
                </Link>
             
              </li>
            </ul>
          </li>


          {/* Block game dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('gameReview')}>
             
            <i className="fa-solid fa-gamepad"></i>
              <span className="Customnav-link-text">Game Review</span>
              <span className="submenu-indicator">
                {toggleDropdown.gameReview ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.gameReview ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/game-review" className={`Customnav-link common-submenu-text ${location.pathname === "/game-review" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-file-signature"></i>
                  <span className="Customnav-link-text"> Game Review List</span>
                </Link>
                <Link to="/add-game-review" className={`Customnav-link common-submenu-text ${location.pathname === "/add-game-review" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-chess-board"></i>

                  <span className="Customnav-link-text">Add Game Review</span>
                </Link>
             
              </li>
            </ul>
          </li>


          {/* Block game dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('blockedGame')}>
             
            <i className="fa-solid fa-gamepad"></i>
              <span className="Customnav-link-text">Blocked Games By Date</span>
              <span className="submenu-indicator">
                {toggleDropdown.blockedGame ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.blockedGame ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/block-game-list" className={`Customnav-link common-submenu-text ${location.pathname === "/block-game-list" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-file-signature"></i>
                  <span className="Customnav-link-text">Blocked Game List</span>
                </Link>
                <Link to="/add-block-game" className={`Customnav-link common-submenu-text ${location.pathname === "/add-block-game" ? 'active' : ''}`}>
                {/* <i className="fas fa-file-alt"></i>  */}
                <i className="fa-solid fa-chess-board"></i>

                  <span className="Customnav-link-text">Add Blocked Game</span>
                </Link>
             
              </li>
            </ul>
          </li>


           {/* Pricing dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('pricing')}>
             
            <i className="fa-solid fa-money-check-dollar"></i>
              <span className="Customnav-link-text">Pricing</span>
              <span className="submenu-indicator">
                {toggleDropdown.pricing ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.pricing ? 'open' : ''}`}>
            {/* <ul className={`submenu ${isWebSettingSubmenuOpen ? 'open' : ''}`}> */}
              <li className="nav-item">
                <Link to="/price-list" className={`Customnav-link common-submenu-text ${location.pathname === "/price-list" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Price List</span>
                </Link>
                {/* <Link to="/Addblogs" className={`Customnav-link common-submenu-text ${location.pathname === "/Addblogs" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Add Blog</span>
                </Link> */}
             
              </li>
            </ul>
          </li>
          {/* Public Holiday dropdown */}
          {/* <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('publicHoliday')}>
            <i className="fas fa-newspaper"></i> 
              <span className="Customnav-link-text">Public Holidays</span>
              <span className="submenu-indicator">
                {toggleDropdown.publicHoliday ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.publicHoliday ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/public-holidays" className={`Customnav-link common-submenu-text ${location.pathname === "/public-holidays" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Public Holiday List</span>
                </Link>
                <Link to="/Addblogs" className={`Customnav-link common-submenu-text ${location.pathname === "/Addblogs" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Add Blog</span>
                </Link> 
              </li>
            </ul>
          </li> */}

          {/* time slot dropdown */}
          {/* <li className="nav-item">
            <div className="Customnav-link" onClick={()=>toggleDropdownFucn('timeSlot')}>
            <i className="fas fa-newspaper"></i> 
              <span className="Customnav-link-text">Time Slot</span>
              <span className="submenu-indicator">
                {toggleDropdown.timeSlot ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${toggleDropdown.timeSlot ? 'open' : ''}`}> 
              <li className="nav-item">
                <Link to="/BlogList" className={`Customnav-link common-submenu-text ${location.pathname === "/BlogList" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Blog List</span>
                </Link>
                <Link to="/Addblogs" className={`Customnav-link common-submenu-text ${location.pathname === "/Addblogs" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Add Blog</span>
                </Link>
             
              </li>
            </ul>
          </li> */}
         

          {/* Blog dropdown */}
          <li className="nav-item">
            <div className="Customnav-link" onClick={toggleWebSettingSubmenu}>
            <i className="fas fa-newspaper"></i> 
              <span className="Customnav-link-text ms-1">Blogs</span>
              <span className="submenu-indicator">
                {isWebSettingSubmenuOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
              </span>
            </div>
            <ul className={`submenu ${isWebSettingSubmenuOpen ? 'open' : ''}`}>
              <li className="nav-item">
                <Link to="/blogs" className={`Customnav-link common-submenu-text ${location.pathname === "/blogs" ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i> 
                  <span className="Customnav-link-text">Blog List</span>
                </Link>
                <Link to="/add-blog" className={`Customnav-link common-submenu-text ${location.pathname === "/add-blog" ? 'active' : ''}`}>
                <i className="fa-solid fa-book-open"></i>
 
                  <span className="Customnav-link-text">Add Blog</span>
                </Link>
             
              </li>
          
            </ul>
          </li>
 
    

          {/* Other nav items... */}
     
     
          {/* <li className="nav-item">
            <Link to="/leaves" className={`Customnav-link ${location.pathname === "/leaves" ? 'active' : ''}`}>
            <i className="fas fa-check-circle"></i>

              <span className="Customnav-link-text">Attendence</span>
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/Property" className={`Customnav-link ${location.pathname === "/Property" ? 'active' : ''}`}>
            <i className="fas fa-building"></i>
              <span className="Customnav-link-text ms-1">Property</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Leads" className={`Customnav-link ${location.pathname === "/Leads" ? 'active' : ''}`}>
            <i className="fas fa-users"></i>
              <span className="Customnav-link-text">Leads</span>
            </Link>
          </li> */}
          
           
          {/* <li className="nav-item">
            <Link to="/admin/newproject" className={`Customnav-link ${location.pathname === "/admin/newproject" ? 'active' : ''}`}>
            <i className="fas fa-project-diagram"></i>

              <span className="Customnav-link-text">New Project</span>
            </Link>
          </li> */}
          
         
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
