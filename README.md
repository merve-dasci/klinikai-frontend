# KlinikAI — Clinical Management Frontend

A modern React-based clinical management dashboard for managing patients, appointments, visits, notes, and AI-powered insights.

## Tech Stack

- **React 19** with Vite 8
- **Tailwind CSS v4** for styling
- **React Router v7** for routing
- **React Hook Form** + **Zod v4** for form validation
- **Axios** with JWT interceptor (access + refresh token)
- **React Hot Toast** for notifications

## Features

- 🔐 JWT authentication with refresh token flow
- 👥 Patient CRUD with server-side pagination & search
- 📅 Appointment CRUD with server-side pagination & search
- 🏥 Visit CRUD with client-side pagination & search
- 📝 Note CRUD with AI analysis per note
- 📊 Dashboard with stats, recent appointments, notes & AI insights
- 🤖 AI-powered note analysis (summary, explanation, suggested action)
- 📱 Responsive sidebar with mobile hamburger menu
- ⏳ Skeleton loading animations
- 🔍 Debounced search across all list pages
- 🧩 Reusable UI components (Modal, Pagination, FormField, Skeleton)

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8080` (Spring Boot)

### Installation

```bash
git clone https://github.com/merve-dasci/klinikai-frontend.git
cd klinikai-frontend
npm install
```

### Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` to set your API URL:

```
VITE_API_URL=http://localhost:8080
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/            # Axios client with JWT interceptors
├── components/
│   ├── dashboard/  # StatCard
│   ├── layout/     # DashboardLayout, Sidebar, Modals
│   └── ui/         # Modal, Pagination, Skeleton, FormField
├── context/        # AuthContext (login, logout, user state)
├── hooks/          # useAuth, useDebounce, usePatients
├── pages/          # Dashboard, Patients, Appointments, Visits, Notes, Login, NotFound
├── routes/         # AppRoutes, PrivateRoute
├── schemas/        # Zod validation schemas
└── services/       # API service functions
```

## License

This project is private.
