import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search notes"
        className="w-full text-sm p-2 pr-12 rounded-3xl border border-green-800 outline-none text-white"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      {/* Icon container */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        {value && (
          <IoMdClose
            className="text-xl text-slate-500 cursor-pointer hover:text-white"
            onClick={onClearSearch}
          />
        )}
        <FaMagnifyingGlass
          className="w-4 h-4 text-green-600 cursor-pointer hover:text-white"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
