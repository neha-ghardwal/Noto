import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search notes"
        className="w-full text-sm p-2 pr-10 rounded-3xl border border-gray-300 outline-none text-white"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      {value ? (
        <IoMdClose
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-slate-500 cursor-pointer hover:text-white"
          onClick={onClearSearch}
        />
      ) : (
        <FaMagnifyingGlass
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 cursor-pointer hover:text-white w-4 h-4"
          onClick={handleSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
