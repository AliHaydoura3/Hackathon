import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getDevices = async () => {
  const res = await axios.get(`${API_BASE}/devices`);
  return res.data;
};

export const patchDevice = async (id, data) => {
  const res = await axios.patch(`${API_BASE}/devices/${id}`, data);
  return res.data;
};

export const postDeviceAction = async (id, data) => {
  const res = await axios.post(`${API_BASE}/devices/${id}/actions`, data);
  return res.data;
};
