import { createContext, useEffect, useState } from "react";
import { fetchMe } from "../api/authApi";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggin, setIsLoggin] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  /*
    user = {
      _id,
      role, 
      email,
      name, 
      lastname
    }
  */
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchMe();
        setUser(response.data.user);
        setIsLoggin(true);
        setClassrooms(response.data.classrooms);
      } catch (e) {}
    })();
  }, []);

  const login = (response) => {
    setUser(response.data);
    setIsLoggin(true);
    localStorage.setItem("access-token", response.data.accessToken);
    localStorage.setItem("refresh-token", response.data.refreshToken);
  };

  const values = {
    user,
    isLoggin,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
