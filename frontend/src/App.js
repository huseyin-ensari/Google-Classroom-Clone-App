import "./App.css";
import { Navigation } from "./components";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
