import React from "react";
import ProfileInfo from "../cards/profileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchbar/search";
import { useState } from "react";

const SideNavBar = ({
  userInfo,
  onSearchNote,
  handleClearSearch,
  isMobile,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <aside
      className={`h-full ${isMobile ? "fixed top-0 left-0 z-50 w-64" : ""}`}
    >
      <nav
        className={`h-full flex flex-col justify-between bg-[#0d0d0d] border border-green-500/20 rounded-2xl p-4 shadow-[0_0_3px_#00ff5580] ${
          isMobile ? "w-full h-screen" : ""
        }`}
      >
        {/* Top section */}
        <div className="flex flex-col gap-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-green-400 self-end text-lg"
            ></button>
          )}
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
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      </nav>
    </aside>
  );
};

export default SideNavBar;
