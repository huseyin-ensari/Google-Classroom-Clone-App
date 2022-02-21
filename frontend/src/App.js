import { Navigation } from "./components";
import { Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
