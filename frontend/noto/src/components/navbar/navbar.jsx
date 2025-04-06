import React from "react";
import { FaGlobe, FaStickyNote } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-10 py-6">
      <div className="flex items-center text-white">
        <FaStickyNote className="w-8 h-8" />
        <div className="text-xl font-semibold">Noto</div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex justify-center items-center border border-white p-2.5 rounded-lg cursor-pointer">
          <FaGlobe className="text-white" />
        </button>
        <button className="flex justify-center items-center border border-white p-2 rounded-lg text-sm font-light text-white">
          <a href="/signup">Signup</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
