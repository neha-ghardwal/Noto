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
      <nav className="h-full flex flex-col justify-between bg-[#0d0d0d] border border-green-500/20 rounded-2xl p-4 shadow-[0_0_3px_#00ff5580]">
        {/* Top section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg text-green-400">Welcome Back!</h2>
          <h4 className="text-xs text-green-200 font-light italic">
            Ready to get started?
          </h4>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
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
