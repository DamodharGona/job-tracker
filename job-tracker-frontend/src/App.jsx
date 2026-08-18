import { Route, Routes } from "react-router-dom";

import { AuthContext } from "./components/app/authContext";
import { useState } from "react";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";

import { Dashboard } from "./pages/dashboardPage";
import JobApplication from "./pages/jobApplicationPage";
import { ResumeMatchPage } from "./pages/resumeMatchPage";

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<JobApplication />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<JobApplication />} />
          <Route path="job-keyword" element={<ResumeMatchPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
