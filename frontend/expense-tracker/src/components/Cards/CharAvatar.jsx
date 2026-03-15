import React from "react";


const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  const initials = words.map((word) => word[0]).join("");

  return initials.toUpperCase();
};

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${style || ""} 
      flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;