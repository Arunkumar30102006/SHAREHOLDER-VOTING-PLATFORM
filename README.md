# 🗳️ Vote India Secure

**Vote India Secure** is a state-of-the-art, secure, and regulatory-compliant e-voting platform tailored for Indian companies. Designed to facilitate digital governance, it implements blockchain-inspired concepts (such as cryptographic vote hashing and verification) and adheres strictly to the **Companies Act, 2013 (Section 108)** regarding weighted share voting.

---

## ✨ Features

### 🏢 Company & Administrative Portal
* **Verified Registration:** Automated CIN (Corporate Identification Number) verification and address validations for registering companies.
* **Voting Session Management:** Create and schedule voting sessions with custom record dates, start/end timelines, and multiple resolutions.
* **Resolution Management:** Upload PDF documents, agendas, and detail specific voting choices for shareholders.
* **Scrutinizer Analytics:** Real-time dashboards showing voting progress, participation rates, and aggregate results for each resolution (For, Against, Abstain) represented in responsive charts.
* **Audit & Compliance Downloads:** Export complete, verifiable PDF and Excel reports for corporate filing and audit logs.

### 👥 Shareholder Portal
* **Secure Access:** Direct login utilizing unique, system-generated credentials sent securely via automated communications.
* **Secure OTP Verification:** Two-factor authorization for sensitive operations.
* **Interactive Ballot Card:** Clear, responsive interface to cast votes on active resolutions.
* **Individual Shareholder Analytics:** View personalized shareholding stakes, historical voting trends, and distribution breakdowns.

### 🧠 Intelligent Add-ons
* **AI Power Suite:** Leverages AI APIs (via Supabase Edge Functions & Groq) to provide:
  - **Document Summarizer:** Instantly summarizes long corporate resolutions and reports.
  - **Sentiment Analysis:** Analyzes shareholder feedback to group responses by emotional tone (Positive, Neutral, Negative) and thematic categories.
* **Vote Assistant:** A global AI chatbot helper that answers shareholder queries on timelines, procedures, and security questions.

### 🌐 Translation & Localization
* Fully internationalized interface using **i18next** supporting both **English** and local languages (such as **Hindi**, **Tamil**, etc.) to accommodate diverse shareholder demographics across India.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 with TypeScript & Vite
* **Styling & UI:** Tailwind CSS, Lucide React (Icons), Radix UI (Primitives via shadcn/ui), and Sonner (Toast Notifications)
* **Charts & Visualizations:** Recharts for responsive business intelligence metrics
* **Database & Auth Backend:** Supabase (PostgreSQL database, Row-Level Security, Real-Time subscriptions)
* **Translation System:** i18next & react-i18next
* **AI & API Integration:** Supabase Edge Functions with Groq Cloud (llama-3.3-70b-versatile) and Google Gemini (for backup translation engines)

---

## 📁 Project Directory Structure

```
vote-india-secure/
├── .env.example            # Environment variables template
├── components.json         # UI component config (shadcn-ui)
├── package.json            # Project dependencies & scripts
├── postcss.config.js       # PostCSS config for Tailwind
├── tailwind.config.ts      # Tailwind configuration and design tokens
├── tsconfig.json           # TypeScript compilation config
├── vercel.json             # Deployment rules for Vercel
├── vite.config.ts          # Vite bundling and plugins setup
├── supabase/               # Backend database and API schema
│   ├── config.toml         # Supabase local environment config
│   ├── functions/          # Deno-based Supabase Edge Functions
│   │   ├── ai-ops/         # Sentiment, chat, and summarization API
│   │   ├── translate-text/ # Gemini-powered resolution translator
│   │   └── ...             # Mailers and OTP verifications
│   └── migrations/         # PostgreSQL schema version histories
└── src/                    # Source Code
    ├── main.tsx            # App Entry Point
    ├── App.tsx             # Route registry and Providers
    ├── App.css             # Main styling overrides
    ├── index.css           # Global layout, fonts, and Tailwind utilities
    ├── components/         # Reusable Components
    │   ├── ui/             # Core shadcn design primitives
    │   ├── layout/         # Header, Footer, and Navbar wrappers
    │   ├── auth/           # Login guards and role validators
    │   ├── ai/             # Summarizer, widget, and chatbot panels
    │   ├── feedback/       # Customer and shareholder feedback forms
    │   └── company/        # Scrutinizer graphs and admin tables
    ├── config/             # Environment loading configurations
    ├── hooks/              # Custom query handlers and translations hooks
    ├── i18n/               # Localization files (en.json, i18next config)
    ├── integrations/       # Supabase client instantiation
    ├── pages/              # Routed Views
    │   ├── Index.tsx       # Landing page
    │   ├── About.tsx       # Company overview page
    │   ├── Security.tsx    # Technical security features explanation
    │   ├── CompanyLogin.tsx# Admin entry portal
    │   ├── VotingDashboard.tsx # Voter client area
    │   └── ...
    ├── services/           # Backend API calls helper (votingApi, etc.)
    └── types/              # TypeScript typings and interfaces
```

---

## 🛢️ Database Schema Highlights

The Supabase database holds the core application state, governed by **Row Level Security (RLS)** policies to ensure shareholders and admin companies only view their respective data:

1. **`companies`**: Holds company names, CIN numbers, registered email, and contact info.
2. **`shareholders`**: Stores shareholder name, demat/folio details, and the number of shares held.
3. **`voting_sessions`**: Session info representing a meeting (record date, timeline, active status).
4. **`resolutions`**: Individual agenda items/proposals to be voted on.
5. **`votes`**: Represents voter choice (For/Against/Abstain) cryptographically hashed (`vote_hash`) to ensure anonymity and auditability.
6. **`shareholder_feedback`**: Stores feedback content, themes, and calculated sentiment ratings.
7. **`resolution_translations`**: Cached translations of resolutions in various regional languages.

---

## 🚀 Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* npm (v9+)
* A Supabase project (for database and storage)

### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Arunkumar30102006/VOTING-2026.git
cd vote-india-secure-main

# Install required packages
npm install
```

### Step 2: Configure Environment Variables
Copy `.env` from the project base (or create one) and set the following variables:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Step 4: Build for Production
To package the app for production (Vite bundles and minifies all assets into the `dist/` directory):
```bash
npm run build
```

---

## 📄 License
This project is proprietary and confidential.
All rights reserved © 2026.
