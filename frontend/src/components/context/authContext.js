import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const port = process.env.REACT_APP_BACK_PORT;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const register = async (inputs) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`/api/auth/register`, inputs, config);
    setCurrentUser(res.data);
  };
  const login = async (email,password) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`/api/auth/login`, {email,password}, config);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.get("/api/auth/logout");
    setCurrentUser(null);
  };
  const createEvents = async (inputs) => {
    console.log(inputs);
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post(`/api/events/create`, inputs, config);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  return (
    <AuthContext.Provider value={{ register, login, logout, currentUser, createEvents }}>
      {children}
    </AuthContext.Provider>
  );
};
