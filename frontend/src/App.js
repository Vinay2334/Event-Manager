import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar.js";
import Home from "./components/pages/Home.js";
import UserEvents from "./components/pages/UserEvents.js";
import LoginSignUp from "./components/pages/LoginSignUp.js";
import Host from "./components/pages/Host.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="components">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myevents" element={<UserEvents />} />
            <Route path="/host" element={<Host />} />
            <Route path="/login" element={<LoginSignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
