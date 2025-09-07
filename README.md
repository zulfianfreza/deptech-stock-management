# Stock Management System

Sistem manajemen stok dengan frontend Next.js dan backend NestJS menggunakan database MySQL.

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: MySQL
- **Package Manager**: npm/yarn

## 📋 Prerequisites

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih tinggi)
- [MySQL](https://www.mysql.com/) (versi 8.0 atau lebih tinggi)
- [Git](https://git-scm.com/)
- npm atau yarn

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/username/stock-management.git
cd stock-management
```

### 2. Setup Database

Buat database MySQL baru:

```sql
CREATE DATABASE stock_management;
```

### 3. Setup Backend (API)

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
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=stock_management

# Application Configuration
PORT=3001
JWT_SECRET=your_jwt_secret_key

# Other configurations
APP_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

#### Run Database Migration & Seeder

Jalankan migration untuk membuat struktur tabel:

```bash
npm run migration:run
```

Jalankan seeder untuk mengisi data awal:

```bash
npm run seed:run
```

#### Start API Server

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

API akan berjalan di: `http://localhost:3001`

### 4. Setup Frontend

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
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Stock Management System

# Other configurations
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
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

## 📁 Project Structure

```
stock-management/
├── api/                    # Backend NestJS
│   ├── src/
│   │   ├── modules/
│   │   ├── entities/
│   │   ├── dto/
│   │   └── main.ts
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── .env.example
│   └── package.json
├── frontend/              # Frontend Next.js
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

### Main Tables

- **users**: Manajemen pengguna
- **categories**: Kategori produk
- **products**: Data produk
- **stocks**: Stok produk
- **transactions**: Transaksi masuk/keluar
- **suppliers**: Data supplier

## 📖 API Documentation

Setelah API berjalan, dokumentasi Swagger tersedia di:
`http://localhost:3001/api-docs`

## 🔧 Available Scripts

### Backend (API)

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Database
npm run migration:create
npm run migration:run
npm run migration:revert
npm run seed:create
npm run seed:run

# Testing
npm run test
npm run test:e2e
```

### Frontend

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Lint
npm run lint

# Type check
npm run type-check
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Pastikan MySQL service berjalan
   - Periksa konfigurasi database di file `.env`
   - Pastikan database sudah dibuat

2. **Port Already in Use**

   - Ganti port di file environment
   - Atau hentikan aplikasi yang menggunakan port tersebut

3. **Migration/Seeder Error**
   - Pastikan database kosong untuk migration pertama
   - Periksa koneksi database
   - Jalankan migration sebelum seeder

### Reset Database

Jika perlu reset database:

```bash
cd api
npm run migration:revert
npm run migration:run
npm run seed:run
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - your.email@example.com
Project Link: [https://github.com/username/stock-management](https://github.com/username/stock-management)
