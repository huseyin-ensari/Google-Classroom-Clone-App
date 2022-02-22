import { Navigation } from "./components";
import { Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage, HomePage } from "./pages/index";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

function App() {
  const { isLoggin } = useContext(AuthContext);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={isLoggin ? <HomePage /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
