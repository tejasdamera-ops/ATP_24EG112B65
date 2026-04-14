// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_ENDPOINTS = {
  EMPLOYEES: `${API_BASE_URL}/emp-api/employees`,
};

export default API_ENDPOINTS;
