export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000/" //  process.env.REACT_APP_API_BASE_URL
    : "http://localhost:5000/";
// http://<your ip address>:5000/
