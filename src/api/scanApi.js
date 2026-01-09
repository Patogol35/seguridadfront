import axios from "axios";
const API_URL = "https://seguridad-5s8y.onrender.com";
export const scanWebsite = async (url) => {
  const response = await axios.post(`${API_URL}/scan`, { url });
  return response.data;
};
