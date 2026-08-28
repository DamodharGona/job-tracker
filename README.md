# JobTracker Monorepo

Welcome to **JobTracker** — a modern, unified job search management platform and resume tailoring assistant. JobTracker helps you track active job applications, analyze metrics via a visual dashboard, and match your resume to Job Descriptions (JDs) using advanced AI models.

## Repository Structure

The project is structured as a monorepo containing two main folders:

```text
job-tracker/
├── job-tracker-backend/   # Express.js REST API with Prisma & PostgreSQL
└── job-tracker-frontend/  # Vite + React.js Client Application
```

---

## ⚡ Quick Start

To get the entire application running locally, follow these guides for both the backend and frontend.

### 1. Backend Setup (`job-tracker-backend/`)

The backend is built using Node.js (ESM), Express, TypeScript, Prisma, and PostgreSQL.

#### Prerequisites
* Node.js (v18+)
* PostgreSQL running locally or in Docker
* Python (with virtual env) if you want to run `markitdown` doc parsing locally

#### Steps:
1. Navigate into the backend directory:
   ```bash
   cd job-tracker-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (or edit existing `.env`):
   ```env
   DATABASE_URL="postgresql://<user>:<password>@localhost:<port>/<db_name>"
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET="your-jwt-signing-secret"
   ENCRYPTION_KEY="32-byte-hex-key-for-aes-256"
   GEMINI_API_KEY="optional-developer-fallback-gemini-key"
   ```
   > **Note**: `ENCRYPTION_KEY` must be a cryptographically strong 32-byte hex string (e.g., `f3e5b328a9b2b2a6f2e20b3864da9ee19a12c8b820a324b1d62c93849ea263d9`) used for symmetric encryption of Gemini API keys.
4. Run Prisma database migrations to set up the schemas:
   ```bash
   npx prisma migrate dev
   ```
5. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
6. Start the local development server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:4000`.

---

### 2. Frontend Setup (`job-tracker-frontend/`)

The frontend is a React application built with Vite, Tailwind CSS, and TanStack React Query.

#### Steps:
1. Navigate into the frontend directory:
   ```bash
   cd ../job-tracker-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend folder pointing to your local backend API:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 🎨 Key Features

1. **Guest Landing Page**
   * Monochrome dashboard previews.
   * Seamless light and dark mode toggling.
   * Direct paths to authentication forms.
2. **Applications Tracker**
   * View all active applications in a clean responsive table or list.
   * Manage progress and stage states.
   * Delayed-loading indicators handling cold/sleeping servers cleanly.
3. **Resume Keyword Matcher**
   * Tailor resumes for target JDs.
   * Displays structural keyword matches, tailored bullet recommendations, and an advisory note.
   * **JD Specificity Badge**: Highlights whether the job description is structural or vague directly beside the match score.
4. **Interactive Dashboard**
   * Visual conversion analytics showing success rate, active pipelines, and stage counts.
5. **Secure Gemini Key Encryption**
   * Stores user-provided Gemini API keys encrypted symmetrically using `aes-256-cbc`.
   * Fallback-free loading that validates keys on backend module start.

---

## 🔌 API Endpoints (Summary)

### Authentication
* `POST /api/auth/register` — Create a new user profile.
* `POST /api/auth/login` — Login user and issue httpOnly session cookie.
* `POST /api/auth/logout` — Clear session cookies and client tokens.
* `GET /api/auth/me` — Verify active cookie session and fetch current profile.
* `PATCH /api/auth/gemini-key` — Upload and symmetrically encrypt the user's Gemini API key.

### Applications
* `POST /api/applications` — Create a new job application record.
* `GET /api/applications` — Fetch job applications (supports query filters for `status` and `searchText` search).
* `GET /api/applications/dashboard` — Fetch applications stage counts and metrics for the dashboard view.
* `GET /api/applications/:id` — Retrieve details for a specific application record.
* `PATCH /api/applications/:id` — Update an existing application record.
* `DELETE /api/applications/:id` — Delete a job application record.
* `POST /api/applications/jd-keyword-matcher` — Upload a resume and evaluate matching details against a job description.

---

## 🛠 Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, TanStack Query, React Hook Form, React Router, Lucide Icons.
* **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JSON Web Tokens (JWT), Crypto (AES-256-cbc).
* **AI Integration**: Google Gen AI SDK (`gemini-3.1-flash-lite`).
