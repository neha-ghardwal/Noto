import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <img
        src={imgSrc}
        alt="No notes"
        className="w-20 sm:w-32 md:w-40 lg:w-48 opacity-75 mb-6 z-20"
      />

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-slate-100 text-center leading-relaxed z-20">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
