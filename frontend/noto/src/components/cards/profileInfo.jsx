import { LogOutIcon } from "lucide-react";
import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) return null;

  return (
    <div className="flex items-center justify-between w-full bg-[#0d0d0d]">
      {/* Profile Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-[#86ab86] bg-[#1a2b1a]">
          {getInitials(userInfo.fullName)}
        </div>
        <p className="text-lg font-medium text-[#66ff66]">
          {userInfo.fullName}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-10 h-10 flex items-center justify-center rounded-full text-[#66ff66] hover:bg-[#1a2b1a] border border-[#66ff66] transition duration-200 cursor-pointer"
      >
        <LogOutIcon className="w-5 h-5 text-[#66ff66]" />
      </button>
    </div>
  );
};

export default ProfileInfo;
