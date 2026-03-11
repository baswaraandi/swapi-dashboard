import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
  timeout: 10000,
});

/**
 * Global fetcher function
 * @param {string} endpoint - 'people', 'planets', etc.
 * @param {object} params - { page, search, format }
 */
export const fetchSwapi = async (endpoint, params = {}) => {
  const { data } = await api.get(`/${endpoint}/`, { params });
  return data;
};

export default api;