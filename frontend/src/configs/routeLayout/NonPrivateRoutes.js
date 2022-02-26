import { Navigate, Outlet } from "react-router-dom";

const NonPrivateRoutes = ({ isLoggin }) => {
  if (isLoggin) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default NonPrivateRoutes;
