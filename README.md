# Contest Hub — Local notes

Summary of recent changes (payment / status / pagination):

- Backend
  - `src/app/(Backend)/api/allcontest/route.js`
    - Added pagination support (`page`, `limit`) with default `limit=10`.
    - Returns `meta` with `currentPage`, `totalPages`, and `limit` plus `total`.
    - Adds `statusLabel` (human readable) on each contest object.
  - `src/app/(Backend)/api/checkout/route.js`
    - Checkout now supports contest payments when request includes `type: 'contest'` or `contestId`.
    - Stripe session metadata now contains `contestId`, `contestTitle`, `registrationFee`, and buyer info for contest payments.
  - `src/app/(Backend)/api/payment-success/route.js`
    - Handles contest payments: when Stripe session metadata includes `contestId`, a payment record is created and the contest's `participantsCount` is incremented.
    - Keeps legacy parcel/delivery behavior as fallback.

- Frontend
  - `src/Componets/utils/hooks/useAllContests.jsx`
    - Now accepts `page` and `limit` and returns `meta` from the API.
  - `src/Componets/Pages/All-Contests/Allcontestpage.jsx`
    - Uses paginated API (10 items per page) and renders pagination controls.

How to test locally

1. Install dependencies and start dev server (project already set up):

```bash
npm install
npm run dev
```

2. Create or open a contest (create contest flow already exists).

3. To simulate a contest checkout, call the checkout API (`/api/checkout`) with a JSON body similar to:

```json
{
  "type": "contest",
  "contestId": "<contestObjectId>",
  "contestTitle": "My Contest",
  "cost": 10,
  "buyerName": "Test User",
  "buyerEmail": "test@example.com"
}
```

The endpoint will create a Stripe Checkout session and return `url`.

4. After completing payment in Stripe, hit the payment-confirm endpoint (server-side PATCH is used by the frontend) passing the `session_id` (Stripe checkout session id). The backend will mark the payment and increment the contest's `participantsCount`.

Notes & next steps

- I added a `statusLabel` on contests returned from the API (readable names). If you prefer to rename status values in the DB (e.g. `pending` → `awaiting_approval`) we can run a migration.
- The frontend payment page (`/payment/[id]`) is referenced from contest cards but not found in the repo; implement a client-side page to call `/api/checkout` with `type: 'contest'` to create sessions and redirect users to Stripe.

If you'd like, I can now:
- Implement the missing frontend `/payment/[contestId]` page and wire checkout redirect.
- Add a small registrations collection to track who joined each contest.
- Migrate DB status values to a standardized set.

Tell me which next step you want me to take.