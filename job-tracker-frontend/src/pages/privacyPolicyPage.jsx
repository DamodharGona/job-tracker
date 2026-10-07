import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiLock,
  FiShield,
  FiSun,
  FiDatabase,
  FiCpu,
  FiCheckCircle,
  FiTrash2,
  FiMail,
  FiGlobe,
} from "react-icons/fi";
import { LuMoonStar } from "react-icons/lu";
import logo from "../assets/logo.png";

function PrivacyPolicyPage() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is blocked
      const dummy = document.createElement("input");
      dummy.value = window.location.href;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const sections = [
    { id: "overview", title: "1. Overview & Scope" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "chrome-extension", title: "3. Chrome Extension Limited Use Policy" },
    { id: "how-we-use", title: "4. How We Use Your Information" },
    { id: "data-security", title: "5. Security & Data Protection" },
    { id: "ai-services", title: "6. AI Processing & Third-Party Services" },
    { id: "retention-deletion", title: "7. Data Retention & Deletion Rights" },
    { id: "cookies-storage", title: "8. Cookies & Local Storage" },
    { id: "contact", title: "9. Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-100 font-sans transition-colors duration-200 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
            >
              <img src={logo} alt="JobTracker Logo" className="h-9 w-auto dark:invert" />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight leading-tight">JobTracker</span>
                <span className="text-[10px] text-neutral-500 dark:text-zinc-400 font-medium">Privacy Center</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition-colors cursor-pointer"
              title="Copy Privacy Policy URL to clipboard"
            >
              {copied ? (
                <>
                  <FiCheck className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>Copy Policy URL</span>
                </>
              )}
            </button>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-neutral-500 dark:text-zinc-400 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <LuMoonStar size={15} /> : <FiSun size={15} />}
            </button>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 transition-colors"
            >
              <FiArrowLeft size={13} />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        {/* Hero Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-3">
            <FiShield className="h-3.5 w-3.5" />
            <span>Chrome Web Store & Web App Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-zinc-400 leading-relaxed mb-2">
            This Privacy Policy describes how <strong>JobTracker</strong> and the <strong>Job Application Tracker Chrome Extension</strong> collect, use, store, and protect your information.
          </p>
          <div className="text-xs text-neutral-500 dark:text-zinc-500 flex flex-wrap gap-x-4 gap-y-1">
            <span><strong>Effective Date:</strong> October 7, 2026</span>
            <span>&bull;</span>
            <span><strong>Last Updated:</strong> October 7, 2026</span>
            <span>&bull;</span>
            <span><strong>Scope:</strong> Chrome Extension & Web Platform</span>
          </div>
        </div>

        {/* Layout with Sidebar Navigation and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Quick Jump Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 p-4 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mb-3">
                Contents
              </h2>
              <nav className="flex flex-col space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:underline transition-colors py-1"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy Content */}
          <div className="lg:col-span-3 space-y-8 text-neutral-800 dark:text-zinc-200 text-sm leading-relaxed">
            {/* Callout Notice */}
            <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 rounded-xl text-blue-900 dark:text-blue-200 text-xs sm:text-sm flex gap-3">
              <FiCheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong>Single-Purpose Commitment:</strong> Job Application Tracker is built solely to help job seekers record, manage, and analyze their job applications. We <strong>never sell your personal data</strong>, we do not inject ads, and we do not track your browsing activity across unrelated websites.
              </div>
            </div>

            {/* Section 1: Overview & Scope */}
            <section id="overview" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiGlobe className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">1. Overview & Scope</h2>
              </div>
              <p className="mb-3">
                JobTracker provides a unified job application management platform and browser extension (&quot;Service&quot;) available at{" "}
                <a
                  href="https://job-tracker-ten-mu-33.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-neutral-900 dark:text-white underline underline-offset-2"
                >
                  job-tracker-ten-mu-33.vercel.app
                </a>{" "}
                and via the <strong>Job Application Tracker</strong> Chrome Extension.
              </p>
              <p>
                By creating an account, installing the browser extension, or accessing the Service, you acknowledge and agree to the practices outlined in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="information-collected" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiDatabase className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">2. Information We Collect</h2>
              </div>
              <p className="mb-4">
                We collect only the data strictly necessary to fulfill the application&apos;s features:
              </p>

              <div className="space-y-4">
                <div className="border-l-2 border-neutral-300 dark:border-zinc-700 pl-3">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">A. Account Credentials</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mt-0.5">
                    When you register, we collect your name, email address, and an encrypted password hash. We never store plain-text passwords.
                  </p>
                </div>

                <div className="border-l-2 border-neutral-300 dark:border-zinc-700 pl-3">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">B. Job Application Records</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mt-0.5">
                    Information you voluntarily submit about jobs you are tracking, including company name, job title, salary range, location, application stage (e.g., Applied, Shortlisted, Interview, Rejected), deadlines, and work mode (Remote/On-site/Hybrid).
                  </p>
                </div>

                <div className="border-l-2 border-neutral-300 dark:border-zinc-700 pl-3">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">C. Resume & Job Description Content (AI Keyword Matcher)</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mt-0.5">
                    If you choose to use the AI Resume Matcher feature, you provide a resume document (PDF or DOCX) and a target job description. This text is processed in real-time solely to identify keyword matches and generate bullet point recommendations.
                  </p>
                </div>

                <div className="border-l-2 border-neutral-300 dark:border-zinc-700 pl-3">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">D. Encrypted User API Keys (Optional)</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mt-0.5">
                    Users may optionally provide their own Google Gemini API key to power AI resume matching. API keys are encrypted at rest using AES-256 encryption and are never exposed in client logs or shared with third parties.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Chrome Extension Specifics */}
            <section id="chrome-extension" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiShield className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">3. Chrome Extension Limited Use Policy</h2>
              </div>
              <p className="mb-3">
                The <strong>Job Application Tracker</strong> extension complies strictly with the{" "}
                <a
                  href="https://developer.chrome.com/docs/webstore/program-policies/limited-use/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-neutral-900 dark:text-white underline inline-flex items-center gap-1"
                >
                  Chrome Web Store Developer Program Policies
                  <FiExternalLink className="h-3 w-3" />
                </a>
                , including the Limited Use requirements:
              </p>

              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 pl-1">
                <li>
                  <strong>No Tracking of Browsing History:</strong> The extension does NOT read, capture, record, or track websites you visit or your browsing activity outside of the popup interface.
                </li>
                <li>
                  <strong>Popup-Only Interaction:</strong> The extension operates as an interactive browser action popup that opens when you click the extension icon.
                </li>
                <li>
                  <strong>No Sale of User Data:</strong> We do not sell, rent, monetize, or trade any user data or extension data to advertisers, data brokers, or any third parties.
                </li>
                <li>
                  <strong>No Advertising or Credit Scoring:</strong> Data is never used or transferred for advertising, marketing profiling, or determining creditworthiness.
                </li>
              </ul>
            </section>

            {/* Section 4: How We Use Information */}
            <section id="how-we-use" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiCpu className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">4. How We Use Your Information</h2>
              </div>
              <p className="mb-3">
                Your data is utilized exclusively for the core functions of the JobTracker service:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-zinc-800/60">
                  <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                    Application Tracking
                  </span>
                  To store, organize, filter, and display your job pipeline and conversion metrics.
                </div>
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-zinc-800/60">
                  <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                    Resume Tailoring
                  </span>
                  To analyze resume skills against job descriptions when explicitly requested by you.
                </div>
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-zinc-800/60">
                  <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                    User Authentication
                  </span>
                  To manage secure sign-in sessions and verify access permissions.
                </div>
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-zinc-800/60">
                  <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                    Service Reliability
                  </span>
                  To monitor system health, address errors, and protect service integrity.
                </div>
              </div>
            </section>

            {/* Section 5: Security & Data Protection */}
            <section id="data-security" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiLock className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">5. Security & Data Protection</h2>
              </div>
              <p className="mb-3">
                We implement industry-grade technical and organizational safeguards to ensure your data is protected against unauthorized access, alteration, or disclosure:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 pl-1">
                <li>
                  <strong>Encryption in Transit:</strong> All communications between the extension, client browser, and backend APIs are secured with HTTPS and TLS protocols.
                </li>
                <li>
                  <strong>Encryption at Rest:</strong> Sensitive credentials and Gemini API keys are encrypted at rest using AES-256 (GCM mode) cryptographic standards.
                </li>
                <li>
                  <strong>Password Security:</strong> User passwords are encrypted using one-way cryptographic hashing algorithms.
                </li>
                <li>
                  <strong>Tenant Isolation:</strong> Database queries are scoped strictly by authenticated user IDs, ensuring complete privacy from other accounts.
                </li>
              </ul>
            </section>

            {/* Section 6: AI Processing & Third-Party Services */}
            <section id="ai-services" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiCpu className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">6. AI Processing & Third-Party Services</h2>
              </div>
              <p className="mb-3">
                To provide AI-powered resume comparison, we interface with Google Gemini AI models via the official Google Generative AI API:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 pl-1">
                <li>
                  <strong>No Model Training:</strong> Prompt data sent for analysis is used solely to generate real-time match results for your session. It is not used to train public or foundational models.
                </li>
                <li>
                  <strong>Hosting Infrastructure:</strong> Our web services are deployed on Vercel and secure cloud database servers adhering to SOC-2 and ISO certifications.
                </li>
              </ul>
            </section>

            {/* Section 7: Retention & Deletion Rights */}
            <section id="retention-deletion" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiTrash2 className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">7. Data Retention & Deletion Rights</h2>
              </div>
              <p className="mb-3">
                You maintain complete ownership of your data at all times:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 pl-1">
                <li>
                  <strong>Edit / Delete Applications:</strong> You can edit or permanently delete any job application or resume analysis directly from your dashboard at any time.
                </li>
                <li>
                  <strong>Account Deletion:</strong> You have the right to request the permanent deletion of your account and all associated records. Upon request, all stored data is permanently purged from our primary databases.
                </li>
              </ul>
            </section>

            {/* Section 8: Cookies & Storage */}
            <section id="cookies-storage" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiDatabase className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">8. Cookies & Local Storage</h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400">
                JobTracker uses HTTP-only session cookies and browser LocalStorage strictly for maintaining authenticated sessions and remembering your display preferences (such as light or dark theme). We do not use third-party tracking cookies or advertising pixels.
              </p>
            </section>

            {/* Section 9: Contact Information */}
            <section id="contact" className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white">
                <FiMail className="h-4 w-4 text-neutral-700 dark:text-zinc-300" />
                <h2 className="text-base sm:text-lg font-bold">9. Contact Us</h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
              </p>
              <div className="p-3 bg-neutral-100 dark:bg-zinc-800 rounded-lg text-xs sm:text-sm flex flex-col gap-1">
                <span><strong>Project:</strong> JobTracker &amp; Job Application Tracker Chrome Extension</span>
                <span><strong>Developer:</strong> Damodhar Gona</span>
                <span><strong>Contact / Support:</strong> <a href="mailto:gonadamodharreddy999@gmail.com" className="underline hover:text-neutral-900 dark:hover:text-white">gonadamodharreddy999@gmail.com</a></span>
                <span><strong>Repository &amp; Issue Tracker:</strong> <a href="https://github.com/DamodharGona" target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">github.com/DamodharGona</a></span>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-neutral-200 dark:border-zinc-900 text-xs text-neutral-400 dark:text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} JobTracker. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signUp" className="hover:underline">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicyPage;
