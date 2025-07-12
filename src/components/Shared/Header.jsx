import React, { useState, useContext } from "react";
import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Header = ({ setMobileSidebarOpen }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle signout
  const handleSignout = () => {
    logout();
    navigate("/tramessy");
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-2.5 border-b border-gray-300 relative z-40 bg-white">
        {/* Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <h3
            className="text-primary md:hidden"
            onClick={() => setMobileSidebarOpen(true)} // Toggle sidebar on mobile
          >
            <FaBars />
          </h3>

          {/* <Link to="/tramessy" className="font-semibold text-primary">
            Home
          </Link> */}
          <div className="flex-1">
  <h1 className="text-sm md:text-lg font-bold text-primary">Transport Management Software</h1>
  <p className="text-[8px] md:text-xs text-gray-500">Smart solutions in a dynamic world</p>
</div>

        </div>

        {/* Search */}
        {/* <div className="hidden md:block relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md outline-none w-96 h-9 px-5"
            placeholder="Search..."
          />
          <div className="absolute top-0 right-0 bg-primary py-2.5 w-10 flex items-center justify-center rounded-r-md text-white hover:bg-secondary cursor-pointer">
            <FaMagnifyingGlass />
          </div>
        </div> */}

        {/* Admin Dropdown */}
        <div className="relative bg-white p-2 rounded-md flex gap-2 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            <img
              src={avatar}
              alt="Admin"
              className="w-8 rounded-2xl drop-shadow"
            />
            <h3 className="font-semibold text-primary">
              {user?.data?.user?.role}
            </h3>
          </div>
          {isAdminOpen && (
            <div className="absolute right-0 top-14 w-52 bg-white drop-shadow p-5 rounded-md shadow-lg z-50">
              <p className="font-semibold text-primary">
                {user?.data?.user?.role}
              </p>
              <span className="text-sm text-gray-600">
                {user?.data?.user?.email}
              </span>
              <p className="text-sm text-gray-600">{user?.data?.user?.phone}</p>
              <p className="mt-4">
                <button
                  onClick={handleSignout}
                  className="text-red-500 font-medium hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
