<div align="center">

# 🏆 Contest Hub Platform

**A Full-Stack Contest Management System**

Publish contests, participate, submit entries, and manage everything through role-based dashboards for admins, creators, and users.

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://contest-hub-platform.vercel.app)

[Live Demo](https://contest-hub-platform.vercel.app) · [Repository](https://github.com/EmonHira135923/Contest-Hub-Platform) · [Report an Issue](https://github.com/EmonHira135923/Contest-Hub-Platform/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [User Roles](#user-roles)
- [Authentication Flow](#authentication-flow)
- [Contest Lifecycle](#contest-lifecycle)
- [Route Map](#route-map)
- [API Reference](#api-reference)
- [Database Collections](#database-collections)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Test Credentials](#test-credentials)
- [Security](#security)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Contest Hub Platform is a modern full-stack contest management system built with **Next.js App Router**. Creators publish contests, users browse and participate, and admins moderate the whole platform — all through dedicated, role-based dashboards.

Core capabilities include:

- 📢 Contest creation and admin approval workflow
- 🔍 Public contest browsing, search, and filtering
- 💳 Paid participation via Stripe checkout
- 📝 Assignment submission and winner declaration
- 📊 Role-specific analytics dashboards
- 🔐 Secure, role-based authentication and access control

## Features

<table>
<tr><td width="50%" valign="top">

**User**

- Email/password registration & login
- Social login (Google, GitHub)
- Browse, search & filter approved contests
- Join contests and pay via Stripe
- Submit contest assignments
- Personal dashboard with participation stats
- Profile with payment & contest history

**Contest Management**

- Creator contest creation flow (category, deadline, prize, instructions)
- Creator-owned contest listing
- Admin review & approval workflow
- Submission review & winner declaration
- Paid participant tracking

**Authentication**

- NextAuth social login (Google, GitHub)
- Custom JWT login with access/refresh cookies
- Role-enriched session payload
- Authenticated profile endpoint & secure logout

</td><td width="50%" valign="top">

**Dashboards & Analytics**

- Multi-role dashboard (admin / creator / user)
- Role-specific analytics cards
- Recharts-powered pie & bar charts
- Admin platform snapshot (users, contests, creators)
- Creator performance charts

**Admin**

- Manage all users & roles
- Approve/reject creator contests
- Delete contests
- Send invitation emails with secure token links
- View contact form submissions

**Platform**

- Cloudinary image uploads
- Nodemailer invitation & contact emails
- Toast notifications (react-toastify)
- Fully responsive Tailwind CSS UI

</td></tr>
</table>

## Tech Stack

| Layer               | Technologies                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**        | Next.js App Router · React 19 · Tailwind CSS v4 · React Query · Recharts · Next Themes · React Hook Form · React Toastify · Framer Motion · React Icons |
| **Backend**         | Next.js API Routes · Node.js · Stripe · Nodemailer · JWT · bcryptjs                                                                                     |
| **Database**        | MongoDB (Node.js driver)                                                                                                                                |
| **Auth**            | NextAuth · Google OAuth · GitHub OAuth · JWT · Email/Password                                                                                           |
| **Other Libraries** | Cloudinary · `lucide-react` · `leaflet` / `react-leaflet` · `js-cookie` · `jose` (JWT verification) · Axios                                             |
| **Deployment**      | Vercel                                                                                                                                                  |

## Architecture

- Frontend pages live under `src/app/(Fronted)`
- Backend API routes live under `src/app/(Backend)/api`
- Shared components and hooks live under `src/Componets`
- Auth context/provider manages session state and logout
- Role-based rendering and route gating use `useRole()` and `AuthContext`
- Authenticated requests go through `useAxiosSecure()`
- Database access is centralized in `src/app/(Backend)/lib/dbConnect.js`

## Folder Structure

```text
src/
├── app/
│   ├── (Fronted)/          # Frontend pages & dashboard routes
│   ├── (Backend)/          # API routes, middleware, backend utilities
│   └── page.jsx            # Homepage
├── Componets/
│   ├── Pages/               # Page-level components (dashboard, contests, auth)
│   ├── Shared/               # Navbar, footer, sidebar
│   ├── Provider/              # Auth and theme providers
│   └── utils/hooks/            # Custom React hooks
├── public/                  # Static assets & JSON data
├── proxy.js                 # Proxy / helper file
└── package.json
```

## User Roles

| Role        | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| **User**    | Browses and joins contests, makes payments, submits entries         |
| **Creator** | Creates and manages contests, reviews submissions, declares winners |
| **Admin**   | Moderates the platform — users, contests, creators, and invitations |

## Authentication Flow

```text
Login / Social Sign-In
        │
        ▼
  Credential / OAuth Validation
        │
        ▼
 JWT Issued (Access + Refresh Cookies)
        │
        ▼
   Role Enrichment (jwt callback)
        │
        ▼
Protected Route / API Validation
        │
        ▼
  Access Granted / Denied
```

- NextAuth handles Google and GitHub OAuth; social logins insert or update users in MongoDB.
- The `jwt` callback enriches the token with role, provider, phone, and image.
- The `session` callback exposes auth state to the client.
- Custom login (`/api/auth/login`) validates credentials and issues JWT access & refresh cookies.
- Protected backend routes verify tokens via `verifyToken`, with `verifyAdmin` / `verifyCreator` for role-gated routes.
- Logout clears auth cookies and redirects to login.

## Contest Lifecycle

```text
Creator submits a contest (/create-contest)
        → Admin reviews it (/dashboard/manage-contests)
        → Approved contests appear in the public listing
        → Users pay to join via Stripe checkout
        → Paid users submit assignments
        → Creator declares a winner after the deadline
        → Status tracked via adminStatus, paymentStatus, contestStatus
        → Winner selection sets isWinner on payments & updates contest metadata
```

## Route Map

| Route                                  | Access        | Description                |
| -------------------------------------- | ------------- | -------------------------- |
| `/`                                    | Public        | Home page                  |
| `/about`                               | Public        | About page                 |
| `/all-contests`                        | Public        | Contest listing            |
| `/all-contests/[id]`                   | Public        | Contest details            |
| `/auth/login`                          | Public        | Login                      |
| `/auth/signup`                         | Public        | Signup                     |
| `/be-a-creator`                        | Public        | Creator onboarding         |
| `/contact`                             | Public        | Contact page               |
| `/leaderboard`                         | Public        | Leaderboard                |
| `/privacy` · `/terms` · `/help`        | Public        | Policy & support pages     |
| `/contest-arena`                       | Authenticated | Contest participation area |
| `/payment/[id]`                        | Authenticated | Payment checkout           |
| `/payment/success` · `/payment/cancel` | Authenticated | Payment result pages       |
| `/profile` · `/profile/[id]`           | Authenticated | Profile pages              |
| `/dashboard`                           | Authenticated | Shared dashboard entry     |
| `/dashboard/manage-mypayments`         | User          | Payment history            |
| `/dashboard/manage-mycontest`          | Creator/User  | My contests                |
| `/dashboard/my-winning`                | All           | Winning contests           |
| `/create-contest`                      | Creator       | Contest creation           |
| `/dashboard/my-created`                | Creator       | Creator's contest list     |
| `/dashboard/submitted-tasks`           | Creator       | Submitted tasks            |
| `/dashboard/manage-users`              | Admin         | User management            |
| `/dashboard/manage-contests`           | Admin         | Contest management         |
| `/dashboard/manage-creator-contests`   | Admin         | Creator contest approval   |
| `/dashboard/manage-creator`            | Admin         | Creator management         |
| `/dashboard/add-user`                  | Admin         | Add user                   |
| `/dashboard/manage-contact`            | Admin         | Contact submissions        |

## API Reference

### Auth

| Method                 | Endpoint                        | Description                | Access                      |
| ---------------------- | ------------------------------- | -------------------------- | --------------------------- |
| `GET`/`POST`           | `/api/auth/[...nextauth]`       | NextAuth social auth       | Public                      |
| `POST`                 | `/api/auth/login`               | Email/password login       | Public                      |
| `POST`                 | `/api/auth/logout`              | Clear auth cookies         | Authenticated               |
| `GET`                  | `/api/auth/myprofile`           | Get current user profile   | Authenticated               |
| `POST`/`GET`           | `/api/auth/register`            | Register user / list users | Public (POST) · Admin (GET) |
| `GET`/`PATCH`/`DELETE` | `/api/auth/register/users/[id]` | Manage a user by ID        | Admin                       |
| `POST`                 | `/api/auth/invite-user`         | Send invitation email      | Admin                       |

### Contests

| Method                 | Endpoint                                        | Description               | Access                        |
| ---------------------- | ----------------------------------------------- | ------------------------- | ----------------------------- |
| `GET`/`POST`           | `/api/allcontest`                               | Browse / create contests  | Public (GET) · Creator (POST) |
| `GET`                  | `/api/allcontest/creator`                       | Creator's contest listing | Creator                       |
| `GET`                  | `/api/allcontest/creator/[id]`                  | Get creator contest by ID | Creator                       |
| `GET`                  | `/api/allcontest/admin`                         | Admin contest review list | Admin                         |
| `GET`/`PATCH`/`DELETE` | `/api/allcontest/admin/[id]`                    | Admin contest operations  | Admin                         |
| `GET`/`PUT`            | `/api/allcontest/contest-submit`                | Manage submissions        | Creator                       |
| `PUT`                  | `/api/allcontest/contest-submit/winner-declare` | Declare a winner          | Creator                       |
| `GET`                  | `/api/allcontest/winningContest`                | Winning contest list      | Winner                        |
| `GET`                  | `/api/leaderboard`                              | Leaderboard data          | Authenticated                 |
| `GET`                  | `/api/popularcontest`                           | Popular contests          | Public                        |

### Payments, Creators & Contact

| Method        | Endpoint               | Description                          | Access        |
| ------------- | ---------------------- | ------------------------------------ | ------------- |
| `GET`/`PATCH` | `/api/payment-success` | Confirm payment / list user payments | Authenticated |
| `GET`         | `/api/creator`         | List all creators                    | Admin         |
| `GET`         | `/api/creator/[id]`    | Get creator by ID                    | Admin         |
| `POST`        | `/api/contact`         | Contact form submission              | Public        |

## Database Collections

| Collection | Purpose                                                    |
| ---------- | ---------------------------------------------------------- |
| `users`    | User accounts, roles, profile data, OAuth provider info    |
| `contests` | Contest metadata — status, creator, prize, deadline        |
| `payments` | Payment records, submission status, tracking, winner flags |

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Vercel account (for deployment)

### Installation

```bash
git clone https://github.com/EmonHira135923/Contest-Hub-Platform.git
cd Contest-Hub-Platform
npm install
npm run dev
```

### Build & Run in Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
# App
NEXT_PUBLIC_API_URL=

# Database
DB_USER=
DB_PASS=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Nodemailer)
EMAIL_USER=
EMAIL_PASS=

# Auth
NEXTAUTH_SECRET_KEY=
NEXTAUTH_REFRESH_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

> ⚠️ All variables above are required. Missing values will disable the related feature (auth, email, payments, or image upload).

## Test Credentials

| Role        | Email             | Password    |
| ----------- | ----------------- | ----------- |
| **Creator** | `user@gmail.com`  | `123456Aa!` |
| **Admin**   | `admin@gmail.com` | `123456Aa!` |

## Security

- JWT authentication with HTTP-only cookies
- Role-based access control via backend middleware (`verifyToken`, `verifyAdmin`, `verifyCreator`)
- NextAuth social provider session management
- Password hashing with bcrypt
- Server-side session validation
- Admin-only and creator-only route protection
- Invitation tokens expire after 24 hours

## Performance Optimizations

- React Query caching for API requests
- `ResponsiveContainer` charts for efficient rendering
- Server-side metadata generation for dashboard pages
- Centralized secure Axios instance for request reuse
- MongoDB pagination via skip/limit
- Cloudinary remote image support via Next.js `remotePatterns`

## Deployment

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Deploy via [Vercel](https://vercel.com) using this repository
4. Configure all required environment variables in the Vercel dashboard

## Roadmap

- [ ] Database schema validation layer
- [ ] Improved error handling and logging
- [ ] Unit and integration tests
- [ ] Server-side role-based route guards
- [ ] Expanded admin analytics and reporting
- [ ] Contest category management in the admin UI
- [ ] Recurring contest scheduling and prize history

## Contributors

- **Repository:** [Contest-Hub-Platform](https://github.com/EmonHira135923/Contest-Hub-Platform)
- **Live Demo:** [contest-hub-platform.vercel.app](https://contest-hub-platform.vercel.app)

## License

No license currently specified for this project.
