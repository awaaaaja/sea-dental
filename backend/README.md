# Backend Structure — Sea Dental

## Overview

Backend menggunakan Supabase (BaaS) dengan PostgreSQL database, Auth, dan Storage.

## Directory Structure

```
backend/
├── migrations/
│   ├── 001_initial_schema.sql    -- Database schema
│   ├── 002_rls_policies.sql     -- Row Level Security
│   └── 003_storage_buckets.sql  -- Storage configuration
└── seed/
    └── seed_data.sql             -- Sample data
```

## Setup Instructions

### 1. Create Supabase Project
- Buka https://supabase.com
- Create project baru dengan ID: `pelnitocxannomjltoci`

### 2. Run Migrations
- Buka SQL Editor di Supabase Dashboard
- Jalankan file migration secara berurutan:
  1. `001_initial_schema.sql`
  2. `002_rls_policies.sql`
  3. `003_storage_buckets.sql`

### 3. Seed Data
- Jalankan `seed_data.sql` untuk data awal

### 4. Environment Variables
Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=https://pelnitocxannomjltoci.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Tables

| Table | Description |
|-------|-------------|
| services | Layanan klinik |
| doctors | Dokter |
| articles | Artikel/blog |
| gallery | Galeri gambar |
| locations | Lokasi klinik |
| faqs | FAQ |
| inquiries | Form kontak |
| bookings | Booking jadwal |
| settings | Pengaturan website |
| transformations | Transformasi senyum |

## Storage Buckets

| Bucket | Purpose |
|--------|---------|
| images | Gambar umum (services, doctors, articles, gallery) |
| avatars | Avatar dokter/staff |

## RLS Policies

- **Public tables** (services, doctors, articles, gallery, locations, faqs, transformations): anon can SELECT
- **Admin tables** (inquiries, bookings): authenticated admin only
- **Settings**: anon can SELECT, authenticated can UPDATE
- **Storage**: public read, authenticated write
