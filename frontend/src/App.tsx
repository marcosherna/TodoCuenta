import { BrowserRouter, Routes, Route } from "react-router";

import DashboardView from "@/pages/DashboardView";
import LoginView from "@/pages/LoginView";
import RegisterView from "@/pages/RegisterView";
import BranchesView from "@/pages/inventory/branches/BranchesView";
import UserView from "@/pages/auth/user/UserView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />

        <Route path="/dashboard" element={<DashboardView />}>
          <Route path="branches" element={<BranchesView />} />
          <Route path="users" element={<UserView />} />
        </Route>

        {/* Add more routes as needed */}
        <Route path="/register" element={<RegisterView />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
