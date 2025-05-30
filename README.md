# 💸 Project Cashier

A modern cashier web application built with **Next.js**, **TypeScript**, and **Prisma ORM**. This project is designed to simulate a point-of-sale (POS) system for small to medium businesses. It includes features like product management, transaction handling, and database integration.

---

## 🚀 Features

- 🔐 Authentication ( clerk authentication)
- 🧾 Transaction handling
- 📦 Product and inventory management
- 📊 Dashboard (future implementation)
- 🧩 Component-based architecture
- 🛢️ Prisma + PostgreSQL (or other SQL DB)
- 💅 Styled with Tailwind CSS

---

## Folder Structure

```bash
project_cashier/
├── prisma/                 # Prisma schema and seed script
│   ├── schema.prisma
│   └── seed.ts
├── public/                 # Static assets (e.g., favicon)
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utilities and Prisma client
│   └── types/              # TypeScript type definitions
├── .env.example            # Example environment variables
├── components.json         # Auto-import config (Nuxt-style setup or tooling)
├── eslint.config.js        # ESLint configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration
├── prettier.config.js      # Prettier configuration
├── start-database.sh       # Shell script to start local database
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## INFO

Please make sure to read the .env.example and make configurate the key needed in supabase

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/simple-pos"
DIRECT_URL="postgresql://postgres:password@localhost:5432/simple-pos"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="clerk-public-key"
CLERK_SECRET_KEY="clerl-private-key"

NEXT_PUBLIC_SUPABASE_URL="next-public-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="next-public-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY= "supabase-service-role-key"
```

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/AriqF1/project_cashier.git
cd project_cashier
```

2. Install dependencies

```
npm install
```

3. Setup environment variables

```
cp .env.example .env
```

4. Setup the database

```
npx prisma migrate dev --name init
npx prisma db seed
```

## This project is licensed under the 📄 MIT License.
