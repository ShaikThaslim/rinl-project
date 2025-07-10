import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, LogOut } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);


  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-semibold">VSP Equipment Delay Log</span>
            </Link>
          </div>

          {/* Right-side Buttons */}
          <div className="flex items-center gap-4 ml-auto">
            {authUser && (
              <>
                <div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition duration-200"
  >
    Go To Analysis
  </button>

  {showDropdown && (
    <div className="absolute mt-2 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[160px]">
      <button
        onClick={() => {
          setShowDropdown(false);
          navigate("/analysis-count");
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Delay Count
      </button>
      <button
        onClick={() => {
          setShowDropdown(false);
          navigate("/analysis-hours");
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Delay Hours
      </button>
    </div>
  )}
</div>


                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition duration-200 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
