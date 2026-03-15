import React from "react";
import { IoMdDocument } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium">Recent Transactions</h5>

        <button
          className="flex items-center gap-2 text-purple-600"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon || <IoMdDocument />}  // fixed
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>

    </div>
  );
};

export default RecentTransactions;