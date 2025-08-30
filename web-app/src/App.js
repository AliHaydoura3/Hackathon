import React, { useEffect, useState } from "react";
import { getDevices } from "./services/api";
import DeviceBubbleChart from "./components/DeviceBubbleChart";
import DeviceActionsModal from "./components/DeviceActionsModal";
import Filters from "./components/Filters";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [filters, setFilters] = useState({ group: "", vendor: "", active: "" });
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    getDevices().then(setDevices);
  }, []);

  const groups = [...new Set(devices.map(d => d.group.name))];
  const vendors = [...new Set(devices.map(d => d.vendor))];

  const filtered = devices.filter(d => {
    if (filters.group && d.group.name !== filters.group) return false;
    if (filters.vendor && d.vendor !== filters.vendor) return false;
    if (filters.active) {
      const activeBool = filters.active === "true";
      if (d.is_active !== activeBool) return false;
    }
    return true;
  });

  const updateDevice = (updated) => {
    setDevices(devices.map(d => (d.id === updated.id ? updated : d)));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Device Dashboard</h1>
      <Filters filters={filters} setFilters={setFilters} groups={groups} vendors={vendors} />
      <DeviceBubbleChart devices={filtered} onSelect={setSelectedDevice} />
      {selectedDevice && (
        <DeviceActionsModal device={selectedDevice} onClose={() => setSelectedDevice(null)} onUpdate={updateDevice} />
      )}
    </div>
  );
}
