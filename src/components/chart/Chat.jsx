import React from "react";
import "./chat.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chat({title, data, dataKey, grid}) {
  return (
    <div className="chat">
      <h3 className="chatTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="gray" />
          <Line type="monotone" dataKey={dataKey} stroke="gray" />
          <Tooltip />
          {grid && <CartesianGrid stroke="gray" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
