import api from "./api";

// GET request
export const get = async (url, params) => {
  const response = await api.get(url, { params });
  return response.data;
};

// POST request
export const post = async (url, data, config) => {
  const response = await api.post(url, data, config);
  return response.data;
};

// PUT request
export const put = async (url, data, config) => {
  const response = await api.put(url, data, config);
  return response.data;
};

// PATCH request
export const patch = async (url, data) => {
  const response = await api.patch(url, data);
  return response.data;
};

// DELETE request
export const del = async (url, params) => {
  const response = await api.delete(url, { params });
  return response.data;
};
