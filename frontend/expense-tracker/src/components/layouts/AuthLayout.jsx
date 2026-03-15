import React from "react";
import CARD_2 from "../../assets/images/card2..jpeg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">

      {/* Left Section */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">
          Expense Tracker
        </h2>
        {children}
      </div>

     <div className="hidden md:block w-[40vw] h-screen relative bg-[#f3f0ff] overflow-hidden">

  {/* TOP RIGHT CURVED BLOCK */}
  <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-purple-700 to-violet-500 rounded-bl-[220px]" />

  {/* BOTTOM LEFT CURVE */}
  <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-gradient-to-tr from-purple-600 to-violet-400 rounded-tr-[180px]" />

  {/* STATS CARD */}
  <div className="absolute top-[110px] right-[60px] z-50">
    <StatsInfoCard
      icon={<LuTrendingUpDown />}
      label="Track Your Income & Expense"
      value="430,000"
      color="bg-purple-600"
    />
  </div>

  {/* GRAPH IMAGE */}
  <img
    src={CARD_2}
    alt="Card"
    className="absolute bottom-[60px] right-[40px] w-[85%] shadow-xl shadow-purple-300/20"
  />
</div>
    </div>
  );
};

export default AuthLayout;



const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="relative w-[420px]">

      {/* Floating Icon */}
      <div
        className={`absolute -top-6 left-6 w-12 h-12 flex items-center justify-center text-[20px] text-white ${color} rounded-full shadow-lg`}
      >
        {icon}
      </div>

      {/* White Card */}
      <div className="bg-white p-6 pt-12 rounded-2xl shadow-lg shadow-purple-200/40">
        <h6 className="text-sm text-gray-500 mb-1">
          {label}
        </h6>
        <span className="text-[24px] font-semibold">
          ${value}
        </span>
      </div>

    </div>
  );
};