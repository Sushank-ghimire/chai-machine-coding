import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("tab");
    if (savedTab) setActiveTab(JSON.parse(savedTab));
  }, []);

  useEffect(() => {
    if (location.pathname) {
      setActiveTab(location.pathname);
    }
    setShowNav(false);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(activeTab));
  }, [activeTab]);

  return (
    <nav className="w-[90vw] mx-auto md:w-full p-4 md:p-8 font-mono text-xl flex justify-between items-center rounded-md shadow-md">
      <div className="cursor-pointer font-sans w-18 h-18">
        <a href="https://chaicode.com">CodeWithChai</a>
      </div>
      <div className="md:flex hidden items-center justify-center space-x-4 font-sans capitalize">
        <NavLink
          to="/otp-form"
          className={({ isActive }) =>
            `p-1 px-2 transition-all duration-100 ${
              isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
            }`
          }
          onClick={() => setActiveTab("/otp-form")}
        >
          OTP Form
        </NavLink>
        <NavLink
          to="/course-list"
          className={({ isActive }) =>
            `p-1 px-2 transition-all duration-100 ${
              isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
            }`
          }
          onClick={() => setActiveTab("/course-list")}
        >
            Courses
        </NavLink>
        <NavLink
          to="/batches"
          className={({ isActive }) =>
            `p-1 px-2 transition-all duration-100 ${
              isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
            }`
          }
          onClick={() => setActiveTab("/batches")}
        >
            Batches
        </NavLink>
      </div>
      <div className="md:hidden">
        <div
        onClick={() => setShowNav((prev) => !prev)}
        className="flex items-center justify-center relative select-none cursor-pointer h-[25px] w-[25px] transition-all duration-100 p-1 bg-black rounded-full border-1">
            <span className={`absolute transition-all duration-75 transform-gpu w-[18px] top-[25%] h-[2px] bg-white rounded-md ${showNav ? "top-[50%] rotate-[45deg]" : null}`}></span>
            <span className={`absolute w-[18px] transition-all duration-75 bottom-[25%] h-[2px] bg-white rounded-md transform-cpu ${showNav ? "top-[50%] -rotate-[45deg]" : null}`}></span>
        </div>
        {showNav && (
          <div className="flex backdrop-blur-md absolute top-[10%] right-[5%] flex-col space-y-4 text-sm">
            <NavLink
              to="/otp-form"
              className={({ isActive }) =>
                `p-1 px-2 transition-all duration-100 ${
                  isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
                }`
              }
              onClick={() => setActiveTab("/otp-form")}
            >
              OTP Form
            </NavLink>
            <NavLink
              to="/course-list"
              className={({ isActive }) =>
                `p-1 px-2 transition-all duration-100 ${
                  isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
                }`
              }
              onClick={() => setActiveTab("/course-list")}
            >
              Courses
            </NavLink>
            <NavLink
              to="/batches"
              className={({ isActive }) =>
                `p-1 px-2 transition-all duration-100 ${
                  isActive ? "bg-[#61dafb] text-[#282c34] p-1 px-2 rounded" : ""
                }`
              }
              onClick={() => setActiveTab("/batches")}
            >
              Batches
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
