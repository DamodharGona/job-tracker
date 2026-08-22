import { Route, Routes } from "react-router-dom";

import { ApiKeyContext, AuthContext } from "./components/app/authContext";
import { useState } from "react";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";

import { Dashboard } from "./pages/dashboardPage";
import JobApplication from "./pages/jobApplicationPage";
import { ResumeMatchPage } from "./pages/resumeMatchPage";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });

  const [hasApiKey, setHasApiKey] = useState(() => {
    const val = localStorage.getItem("hasApiKey");
    if (!val || val === "undefined") return false;
    try {
      return JSON.parse(val) === true;
    } catch {
      return false;
    }
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      <ApiKeyContext.Provider value={{ hasApiKey, setHasApiKey }}>
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
      </ApiKeyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
