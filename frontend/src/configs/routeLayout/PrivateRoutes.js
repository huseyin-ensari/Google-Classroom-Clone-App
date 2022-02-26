import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isLoggin }) => {
  if (!isLoggin) {
    return <Navigate to={"/register"} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
