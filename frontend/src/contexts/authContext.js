import { createContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { fetchLogout, fetchMe } from "../api/authApi";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggin, setIsLoggin] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setClassrooms(response.data.classrooms);
        setUser(response.data.user);
        setIsLoggin(true);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsLoggin(false);
    setUser(null);
    await fetchLogout(user._id);
  };

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
    classrooms,
    logout,
  };

  if (loading) {
    return <Spinner animation="grow" variant="primary" />;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
