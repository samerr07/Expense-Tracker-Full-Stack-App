import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
      <BarChart  data={budgetList} margin={{top:7}}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId={"a"} fill="#8884d8" />
        <Bar dataKey="amount" stackId={"a"} fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
