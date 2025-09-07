# Stock Management System

Sistem manajemen stok dengan frontend Next.js dan backend NestJS menggunakan database MySQL.

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: MySQL

## 🚀 Getting Started

### 1. Clone Repository

```bash
https://github.com/zulfianfreza/deptech-stock-management
cd deptech-stock-management
```

### 2. Setup Backend

#### Install Dependencies

```bash
cd api
npm install
```

#### Environment Configuration

Copy file environment dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Edit file `.env` sesuai dengan konfigurasi Anda:

```env
NODE_ENV=development
PORT=8000
JWT_SECRET=5ab79598bd069f0e079a3f9c5afe90b0

DB_HOST=localhost
DB_PORT=8889
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=product_stock_db
```

#### Run Database Migration & Seeder

Jalankan seeder untuk mengisi data awal:

```bash
npm run seed
```

#### Start API Server

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start
```

API akan berjalan di: `http://localhost:8000`

### 3. Setup Frontend

#### Install Dependencies

Buka terminal baru dan navigasi ke folder frontend:

```bash
cd frontend
npm install
```

#### Environment Configuration

Copy file environment:

```bash
cp .env.example .env.local
```

Edit file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Start Frontend Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm run start
```

Frontend akan berjalan di: `http://localhost:3000`
