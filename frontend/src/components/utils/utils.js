// utils/auth.js
import jwt_decode from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwt_decode(token);
};
