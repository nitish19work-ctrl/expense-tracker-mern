import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const label = payload[0].payload.month || payload[0].payload.category;

      return (
        <div className="bg-white shadow-md rounded-lg px-3 py-2 border border-gray-200">
          <p className="text-xs font-semibold text-purple-700 mb-1">
            {label}
          </p>

          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="font-semibold text-gray-900">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // detect which key exists
  const xAxisKey = data[0]?.month ? "month" : "category";

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>

          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />

          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;