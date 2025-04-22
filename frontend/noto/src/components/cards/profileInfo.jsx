import { LogOutIcon } from "lucide-react";
import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Profile Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-900 font-medium bg-slate-200">
          {getInitials("Neha Ghardwal")}
        </div>
        <p className="text-sm font-medium text-white">Neha</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="text-white hover:text-black transition duration-200"
      >
        <LogOutIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProfileInfo;
