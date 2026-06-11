# Contest Hub Platform

## Project Overview
Contest Hub Platform is a modern full-stack contest management system built with Next.js App Router. It allows creators to publish contests, users to browse and participate, and admins to manage contests, users, and platform settings. The platform supports role-based dashboards, payment workflows, content submission, winner selection, and admin moderation.

## Features

### User Features
- User registration via email/password
- Social login with Google and GitHub
- Browse approved contests
- Search and filter contests by category
- Join contests and make payments via Stripe
- Submit contest assignments
- View personal dashboard with participation stats
- Profile page with payment history and joined contest details

### Contest Management Features
- Creator contest creation flow
- Contest categories, deadlines, prizes, and submission instructions
- Creator-owned contest listing
- Admin review and approval workflow for contests
- Creator submission review and winner declaration
- Paid contest participant tracking and status updates

### Authentication Features
- NextAuth social login (Google, GitHub)
- Custom email/password login with JWT cookies
- Access token and refresh token cookies
- Role-based session payload and token enrichment
- Authenticated profile endpoint
- Secure logout endpoint

### Dashboard Features
- Multi-role dashboard for admin / creator / user
- Role-specific analytics and cards
- Admin platform snapshot with user, contest, creator analytics
- Creator contest performance charts
- User activity breakdown charts
- Separate pages for dashboard management tasks

### Admin Features
- Manage all registered users
- Grant/revoke roles
- View full contest queue
- Approve or reject creator contests
- Delete contests
- Send invitation emails with secure token links
- View platform contact submissions
- Access admin-only API endpoints

### Analytics Features
- Recharts-powered charts for dashboard analytics
- Role-specific pie and bar charts
- Creator and admin analytics summaries
- Payment, submission, and contest metrics

### Security Features
- JWT-based authentication
- Role verification middleware for admin and creator routes
- Protected API endpoints with `verifyToken`, `verifyAdmin`, `verifyCreator`
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Server-side session validation via NextAuth
- Token expiration handling

### Notification Features
- Invitation email sending via nodemailer
- Email template generation for invitation links
- Contact submission email capture
- User-facing toast notifications (react-toastify)

### Responsive UI Features
- Responsive layout using Tailwind CSS
- Mobile-friendly dashboard and pages
- Dynamic client-side theme values
- Accessible navigation and forms

### Other Features
- Cloudinary image upload support
- Stripe payment integration
- Contest search and pagination
- Role-specific navigation
- Support for creator invite workflow
- Contact and help pages

## Technology Stack

### Frontend
- Next.js App Router
- React 19
- Tailwind CSS v4
- React Query
- Recharts
- Next Auth
- Next Themes
- axios
- react-hook-form
- React Toastify
- Framer Motion
- React Icons

### Backend
- Next.js API routes
- Node.js
- Stripe
- Nodemailer
- JSON Web Token (JWT)
- bcryptjs

### Database
- MongoDB
- MongoDB Node driver

### Authentication
- NextAuth
- Google OAuth
- GitHub OAuth
- JWT
- Email/password auth

### Deployment
- Vercel

### Additional Libraries
- Cloudinary
- `lucide-react`
- `leaflet` / `react-leaflet`
- `js-cookie`
- date formatting via `Intl`
- `jose` for JWT verification

## Project Architecture
- Frontend pages are under `src/app/(Fronted)`
- Backend API routes are under `src/app/(Backend)/api`
- Shared components and hooks are under `src/Componets`
- Auth context and provider manage user session state and logout
- Role-based rendering and route gating use `useRole()` and `AuthContext`
- API requests use `useAxiosSecure()` for authenticated calls
- Database connections and collections are centralized in `src/app/(Backend)/lib/dbConnect.js`

## Folder Structure
- `src/app/`
  - `(Fronted)/` — frontend pages and dashboard routes
  - `(Backend)/` — API routes, middleware, backend utilities
  - `page.jsx` — homepage
- `src/Componets/`
  - `Pages/` — page-level React components for dashboard, contests, auth
  - `Shared/` — shared layout parts like navbar, footer, sidebar
  - `Provider/` — auth and theme providers
  - `utils/hooks/` — custom React hooks
- `public/` — static assets and JSON data
- `src/proxy.js` — proxy or helper file
- `package.json` — dependencies and scripts

## Installation Guide

### Prerequisites
- Node.js
- npm
- MongoDB database
- Vercel account for deployment

### Clone Repository
```bash
git clone https://github.com/EmonHira135923/Contest-Hub-Platform.git
cd Contest-Hub-Platform
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file with required values:

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base frontend/API URL | Yes |
| `DB_USER` | MongoDB username | Yes |
| `DB_PASS` | MongoDB password | Yes |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary preset | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `EMAIL_PASS` | Email password for nodemailer | Yes |
| `EMAIL_USER` | Email sender address | Yes |
| `NEXTAUTH_SECRET_KEY` | NextAuth secret | Yes |
| `NEXTAUTH_REFRESH_KEY` | JWT refresh secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Yes |
| `GITHUB_ID` | GitHub OAuth client ID | Yes |
| `GITHUB_SECRET` | GitHub OAuth client secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |

### Run Development Server
```bash
npm run dev
```

### Build Production Version
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Public base URL for API and invitation links |
| `DB_USER` | MongoDB user |
| `DB_PASS` | MongoDB password |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret |
| `EMAIL_PASS` | Password for email sender account |
| `EMAIL_USER` | Email address for sending invitations/notifications |
| `NEXTAUTH_SECRET_KEY` | Secret for NextAuth and JWT signing |
| `NEXTAUTH_REFRESH_KEY` | Refresh JWT signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_ID` | GitHub OAuth client ID |
| `GITHUB_SECRET` | GitHub OAuth client secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

## Route Summary

| Route | Access Level | Description |
|---|---|---|
| `/` | Public | Home page |
| `/about` | Public | About page |
| `/all-contests` | Public | Contest listing |
| `/all-contests/[id]` | Public | Contest details |
| `/auth/login` | Public | Login page |
| `/auth/signup` | Public | Signup page |
| `/be-a-creator` | Public | Creator onboarding |
| `/contact` | Public | Contact page |
| `/contest-arena` | Authenticated | Contest participation area |
| `/create-contest` | Creator | Contest creation page |
| `/dashboard` | Authenticated | Shared dashboard entry |
| `/dashboard/manage-users` | Admin | User management page |
| `/dashboard/manage-contests` | Admin | Contest management page |
| `/dashboard/manage-creator-contests` | Admin | Creator contest approval |
| `/dashboard/manage-creator` | Admin | Creator management page |
| `/dashboard/manage-mypayments` | User | Payment history page |
| `/dashboard/manage-mycontest` | Creator/User | My contest list |
| `/dashboard/my-created` | Creator | Creator contest list |
| `/dashboard/submitted-tasks` | Creator | Submitted tasks page |
| `/dashboard/add-user` | Admin | Add user page |
| `/dashboard/manage-contact` | Admin | Contact submissions page |
| `/leaderboard` | Public | Leaderboard page |
| `/payment/[id]` | Authenticated | Payment checkout page |
| `/payment/success` | Authenticated | Payment success page |
| `/payment/cancel` | Authenticated | Payment cancellation page |
| `/profile` | Authenticated | Profile page |
| `/profile/[id]` | Authenticated | Profile detail page |
| `/privacy` | Public | Privacy policy page |
| `/terms` | Public | Terms page |
| `/help` | Public | Help page |

## API Documentation

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth social auth API | N/A |
| POST | `/api/auth/login` | Custom email/password login | N/A |
| POST | `/api/auth/logout` | Logout and clear auth cookies | Authenticated |
| GET | `/api/auth/myprofile` | Fetch current user profile | Authenticated |
| POST/GET | `/api/auth/register` | Register user / admin get users list | Admin for GET |
| GET/PATCH/DELETE | `/api/auth/register/users/[id]` | Manage user by ID | Admin |
| POST | `/api/auth/invite-user` | Send invitation email | Admin |
| GET/POST | `/api/allcontest` | Browse contests / create contest | Authenticated / Creator |
| GET | `/api/allcontest/creator` | Creator contest listing | Creator |
| GET | `/api/allcontest/creator/[id]` | Get creator contest by ID | Creator |
| GET | `/api/allcontest/admin` | Admin contest review list | Admin |
| GET/PATCH/DELETE | `/api/allcontest/admin/[id]` | Admin contest operations | Admin |
| GET/PUT | `/api/allcontest/contest-submit` | Creator submission management | Creator |
| PUT | `/api/allcontest/contest-submit/winner-declare` | Declare contest winner | Creator |
| PATCH/GET | `/api/payment-success` | Stripe payment confirmation / user payments | Authenticated |
| GET | `/api/creator` | Admin list creators | Admin |
| GET | `/api/creator/[id]` | Get creator by ID | Admin |
| POST | `/api/contact` | Contact form submission | Public |
| GET | `/api/popularcontest` | Fetch popular contests list | Public |

## Database Collections / Models

| Collection | Purpose |
|---|---|
| `users` | Stores user accounts, roles, profile data, provider info |
| `contests` | Stores contest metadata, status, creator, prize, deadline |
| `payments` | Stores payment records, submission status, tracking, winner flags |

## User Roles
- User
- Creator
- Admin

## Authentication Flow
- NextAuth is configured for Google and GitHub OAuth.
- Social login inserts or updates users in MongoDB.
- `jwt` callback enriches token with user role, provider, phone, image.
- `session` callback exposes authentication state to client.
- Custom login uses `/api/auth/login`, validates credentials, issues JWT access & refresh cookies.
- Protected backend routes verify tokens via `verifyToken`.
- Role-specific middleware uses `verifyAdmin` and `verifyCreator`.
- Logout clears auth cookies and redirects to login.

## Admin Panel
- Admin dashboard with platform analytics
- Manage users, roles, and creator status
- Approve/reject contests
- Delete contests
- Send invitation emails to users with roles
- Access admin-only API endpoints

## Contest Management System
- Creators submit contests via `/create-contest`
- Admin reviews via `/dashboard/manage-contests`
- Approved contests become visible to public contest listing
- Users pay to join contests using Stripe checkout
- Paid users can submit assignments through contest submission endpoints
- Creators can declare winners after contest deadline
- Contest status tracked through `adminStatus`, `paymentStatus`, `contestStatus`
- Winner selection writes `isWinner` in payments and updates contest metadata

## Security Measures
- JWT authentication with HTTP-only cookies
- Role-based access control in backend middleware
- NextAuth social provider session management
- Password hashing using bcrypt
- Token validation in API requests
- Admin-only and creator-only route protection
- Email invite tokens expire after 24 hours

## Performance Optimizations
- Frontend uses React Query for caching API requests
- ResponsiveContainer charts for efficient rendering
- Server-side metadata generation for dashboard pages
- Centralized secure Axios instance for request reuse
- MongoDB query pagination and skip/limit usage
- Cloudinary remote image support via Next.js remotePatterns

## Deployment Instructions
- Build with `npm run build`
- Start with `npm start`
- Deploy on Vercel using this repo
- Ensure environment variables are configured in Vercel dashboard

## Future Improvements
- Add database models/schema validation layer
- Implement better error handling and logging
- Introduce unit/integration tests
- Add role-based route guards on server side
- Build an admin analytics dashboard with more reporting
- Add contest categories management in admin UI
- Add repeated contest scheduling and prize history

## Contributors
- Project repository: https://github.com/EmonHira135923/Contest-Hub-Platform

## License
Not detected in project
