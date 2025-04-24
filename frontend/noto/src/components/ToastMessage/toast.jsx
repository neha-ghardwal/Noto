import React, { useEffect } from "react";
import { MdCheck, MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (!isShown) return;

    const timeoutId = setTimeout(onClose, 3000);
    return () => clearTimeout(timeoutId);
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex justify-center items-center w-full sm:w-auto pointer-events-none transition-opacity duration-300 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`pointer-events-auto flex items-center gap-3 bg-gray-800 border border-gray-700 shadow-xl rounded-md py-2 px-4 max-w-sm w-full mx-4 sm:mx-0`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {type === "delete" ? (
            <MdDeleteOutline className="text-2xl text-white" />
          ) : (
            <MdCheck className="text-2xl text-white" />
          )}
        </div>
        <p className="flex-1 text-sm text-white">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
