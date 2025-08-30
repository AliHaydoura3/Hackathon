import React, { useState } from "react";
import { postDeviceAction } from "../services/api";

export default function DeviceActionsModal({ device, onClose, onUpdate }) {
  const [category, setCategory] = useState("");

  const performAction = async (actionType) => {
    try {
      let payload = { action: actionType };
      if (actionType === "toggle_block") payload.category = category;
      const updated = await postDeviceAction(device.id, payload);
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "absolute", top: 50, left: 50, background: "#fff", padding: "1rem", border: "1px solid #ccc" }}>
      <h3>{device.given_name}</h3>
      <button onClick={() => performAction("isolate")}>Isolate</button>
      <button onClick={() => performAction("release")}>Release</button>
      <div>
        <input placeholder="Blocklist category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button onClick={() => performAction("toggle_block")}>Toggle Block</button>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
