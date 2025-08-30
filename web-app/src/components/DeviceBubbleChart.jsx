import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function DeviceBubbleChart({ devices, onSelect }) {
  const data = devices.map((d, i) => ({
    x: i,
    y: d.is_active ? 1 : 0,
    category: d.ai_classification.device_category,
    device: d
  }));

  return (
    <ScatterChart width={600} height={300}>
      <XAxis type="number" dataKey="x" name="Index" />
      <YAxis type="number" dataKey="y" name="Active" />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        formatter={(value, name, props) => props.payload.device.given_name}
      />
      <Legend />
      <Scatter name="Devices" data={data} fill="#8884d8" onClick={(e) => onSelect(e.device)} />
    </ScatterChart>
  );
}
