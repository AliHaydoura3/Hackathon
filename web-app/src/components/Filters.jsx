import React from "react";

export default function Filters({ filters, setFilters, groups, vendors }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <select value={filters.group} onChange={(e) => setFilters({ ...filters, group: e.target.value })}>
        <option value="">All Groups</option>
        {groups.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>

      <select value={filters.vendor} onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}>
        <option value="">All Vendors</option>
        {vendors.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>

      <select value={filters.active} onChange={(e) => setFilters({ ...filters, active: e.target.value })}>
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
  );
}
