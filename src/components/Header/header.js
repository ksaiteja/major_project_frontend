import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <div className="flex items-center z-20 justify-between fixed w-full h-20 px-10 bg-gray-100">
      <h2 className="font-bold text-lg">App Name</h2>
      <div
        className={`flex flex-row space-x-4 ${
          location.pathname === "/" ? "" : "hidden"
        }`}
      >
        <Link to="/signup">SignUp</Link>
        <Link to="/">SignIn</Link>
      </div>
      <div
        className={`flex flex-row space-x-4 ${
          location.pathname === "/admin" ? "" : "hidden"
        }`}
      >
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Header;
