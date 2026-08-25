import { Route, Routes, Navigate } from "react-router-dom";

import { ApiKeyContext, AuthContext } from "./components/app/authContext";
import { useState, useEffect } from "react";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import LandingPage from "./pages/landingPage";

import { Dashboard } from "./pages/dashboardPage";
import JobApplication from "./pages/jobApplicationPage";
import { ResumeMatchPage } from "./pages/resumeMatchPage";
import { verifyAuth } from "./repository/authApis";

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-neutral-800 dark:text-zinc-200" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm font-medium tracking-wide text-neutral-500 dark:text-zinc-400">Loading JobTracker...</span>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [hasApiKey, setHasApiKey] = useState(() => {
    const val = localStorage.getItem("hasApiKey");
    if (!val || val === "undefined") return false;
    try {
      return JSON.parse(val) === true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const verifySession = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }
      try {
        const res = await verifyAuth();
        const verifiedUser = res.user;
        setUser(verifiedUser);
        localStorage.setItem("user", JSON.stringify(verifiedUser));
        localStorage.setItem("hasApiKey", JSON.stringify(verifiedUser?.hasGeminiApiKey));
        setHasApiKey(verifiedUser?.hasGeminiApiKey === true);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("hasApiKey");
        setUser(null);
        setIsAuthenticated(false);
        setHasApiKey(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    verifySession();
  }, []);

  if (isCheckingAuth) {
    return <FullScreenLoader />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      <ApiKeyContext.Provider value={{ hasApiKey, setHasApiKey }}>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />}>
                <Route index element={<JobApplication />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<JobApplication />} />
                <Route path="job-keyword" element={<ResumeMatchPage />} />
              </Route>
            </>
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />}
          />
        </Routes>
      </ApiKeyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
