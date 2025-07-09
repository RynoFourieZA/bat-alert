import { BrowserRouter, Route, Routes } from "react-router";
import { useAppSelector } from "./app/hooks";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}  />
      <Route path="/dashboard" element={<Dashboard />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
