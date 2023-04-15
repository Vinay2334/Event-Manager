import { useContext, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/authContext";
import {toast} from "react-toastify";

function Navbar() {
  const navRef = useRef();
  const { currentUser, logout } = useContext(AuthContext);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = async (e) => {
    try {
      await logout();
      toast.success("Logged Out Sccessfully");
      window.location.assign('/')
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <header>
      <img src="/logo.jpg" alt="logo" className="logo"/>
      <nav ref={navRef}>
        <div className="nav-details">
          <Link to="/">Browse Events</Link>
          <Link to="/host">Host an Event</Link>
        </div>
        <div className="user-details">
          {currentUser && (
			<>
			<Link to="/myevents">Your Events</Link>
            <img src={`${currentUser.user.img}`} alt="img"/> 
			</>
          )}
          <span>{currentUser?.user.email}</span>
          {currentUser ? (
            <button className="logout" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </div>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
