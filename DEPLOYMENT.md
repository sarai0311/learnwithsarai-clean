# Deployment Guide

## Overview
This application is now configured for deployment on Vercel with serverless functions handling the backend API. The frontend and backend are deployed together as a single Vercel project.

## Deployment Steps

### 1. Connect to Vercel
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the configuration from `vercel.json`

### 2. Environment Variables
In your Vercel project settings, add these environment variables:

**Google Calendar Integration:**
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Your Google service account email
- `GOOGLE_PRIVATE_KEY`: Your Google service account private key (include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- `GOOGLE_CALENDAR_ID`: Your Google Calendar ID (e.g., `sarai.syav@gmail.com`)

**Stripe Payment Integration:**
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_test_` or `pk_live_`)

**Note:** The frontend uses `VITE_STRIPE_PUBLISHABLE_KEY` which gets embedded in the client-side code during build time. The backend API uses `STRIPE_SECRET_KEY` for secure server-side operations.
- `VITE_GOOGLE_CALENDAR_ID`: Same as GOOGLE_CALENDAR_ID
- `VITE_GOOGLE_CALENDAR_TIMEZONE`: `Atlantic/Canary`

**Supabase Database (Optional):**
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Custom Domain
To use `learnwithsarai.com`:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your DNS records

### 4. Deploy
Once configured, Vercel will automatically deploy your application. The API endpoints will be available at:
- `/api/create-payment-intent`
- `/api/calendar/availability`
- `/api/calendar/create-event`
- `/api/health`

## Architecture
- **Frontend**: React/Vite served from Vercel's CDN
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe API
- **Calendar**: Google Calendar API

## Features
- ✅ Google Calendar integration with real-time availability
- ✅ Timezone conversion for international users
- ✅ Stripe payment processing
- ✅ Automatic Google Meet link generation
- ✅ Responsive design
- ✅ Multi-language support (English/Spanish)

## Local Development
For local development, you can still run:
```bash
npm run dev
```

This will start the Vite development server on `localhost:5173` (or `localhost:8080` as configured). The API calls will be made to the same domain during development.

## Production URLs
- Frontend: `https://learnwithsarai.com`
- API: `https://learnwithsarai.com/api/*` 