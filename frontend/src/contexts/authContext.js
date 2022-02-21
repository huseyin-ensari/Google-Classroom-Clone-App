import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggin, setIsLoggin] = useState(false);
  const login = (response) => {
    setUser(response.data);
    setIsLoggin(true);
  };

  const values = {
    user,
    isLoggin,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
