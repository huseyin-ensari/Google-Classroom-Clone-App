import { Navigation } from "./components";
import { Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage, HomePage } from "./pages/index";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";
import { PrivateRoutes, NonPrivateRoutes } from "./configs/routeLayout";

function App() {
  const { isLoggin } = useContext(AuthContext);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={isLoggin ? <HomePage /> : <LandingPage />} />
        {/* NonPrivateRoutes */}
        <Route element={<NonPrivateRoutes isLoggin={isLoggin} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* End of NonPrivateRoutes */}
        {/* PrivateRoutes */}
        <Route element={<PrivateRoutes isLoggin={isLoggin} />}></Route>
        {/* End of PrivateRoutes */}
      </Routes>
    </div>
  );
}

export default App;
