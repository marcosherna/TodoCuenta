import { BrowserRouter, Routes, Route } from "react-router";

import DashboardView from "@/pages/DashboardView";
import LoginView from "@/pages/LoginView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />

        {/* Add more routes as needed */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
