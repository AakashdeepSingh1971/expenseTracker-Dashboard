# Fin Insight Backend (Express + MongoDB + UploadThing)

## What is included
- Express server (TypeScript)
- MongoDB models (User, Expense)
- JWT authentication
- UploadThing config (server-side) for handling uploads
- Routes: /api/auth, /api/expenses

## Quick start (development)
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   # or specifically backend dev:
   npm run dev:backend
   ```
## Notes
- This scaffold expects UploadThing to be configured with your UploadThing account.
- For production, build the project (`npm run build`) and run `npm start`.
