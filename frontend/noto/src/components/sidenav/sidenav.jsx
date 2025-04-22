import React from "react";
import { FaStickyNote } from "react-icons/fa";
import ProfileInfo from "../cards/profileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchbar/search";
import { useState } from "react";

const SideNavBar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <aside className="h-full">
      <nav className="h-full flex flex-col justify-between bg-gradient-to-b from-blue-950 via-blue-800 to-blue-900 rounded-2xl p-4">
        {/* Top section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-white">Welcome Back!</h2>
          <h4 className="text-xs text-slate-200 font-light italic">
            Ready to get started?
          </h4>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>

        {/* Bottom section (Profile Info) */}
        <div>
          <ProfileInfo onLogout={onLogout} />
        </div>
      </nav>
    </aside>
  );
};

export default SideNavBar;
