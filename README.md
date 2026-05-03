# Anushka Resin Artistry - Luxury E-Commerce

A high-end, modern, fully responsive luxury e-commerce website built with Next.js and Supabase.

## Tech Stack
*   **Frontend**: Next.js (App Router), React, Vanilla CSS (Glassmorphism + Animations)
*   **Backend & DB**: Supabase
*   **Auth**: Supabase Auth (Google Sign-In only)
*   **Hosting**: Vercel
*   **Version Control**: GitHub

## Features
*   **Luxury Design**: Black, Gold, White theme with smooth animations and glassmorphism.
*   **Admin CMS**: Protected routes using Next.js Middleware. Only authorized emails (stored in `admin_users` table) can access.
*   **Custom Orders**: A detailed form for commissioning custom resin art.
*   **Product Catalog**: Ready-made products with category filtering.
*   **UPI Payment Flow**: Collects UPI reference and screenshots.

## Setup Instructions

### 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to **SQL Editor** and paste the contents of `supabase/schema.sql` to create your tables and storage buckets.
3. Go to **Authentication > Providers** and enable **Google**. Follow the instructions to get your Google Client ID and Secret.
4. Go to **Authentication > URL Configuration** and add your localhost URL (e.g., `http://localhost:3000`) and Vercel URL to the Site URL and Redirect URLs.

### 2. Environment Variables
Edit the `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Running Locally
Make sure you have Node.js installed.

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access
To gain admin access locally or in production:
1. Log into your Supabase dashboard.
2. Go to the **Table Editor** > `admin_users` table.
3. Insert your Google Email address manually into the `email` column.
4. Go to the website and log in using the same Google account.

### 5. Deployment
Push the code to GitHub and import the repository into **Vercel**. Don't forget to add the Environment Variables in the Vercel project settings!
