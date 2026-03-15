import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>

        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#333"
              fontSize="22px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}

      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;