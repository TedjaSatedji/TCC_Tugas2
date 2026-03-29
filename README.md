# 📝 NoteSpace — Tugas 2 Teknologi Infrastruktur

**Nama:** Anak Agung Ngurah Sadewa Tedja  
**NIM:** 123230050  
**Kelas:** IF-H  
**Mata Kuliah:** Teknologi Infrastruktur

---

## Struktur Project

```
notes-app/
├── backend/
│   ├── routes/
│   │   └── notes.js        # CRUD routes
│   ├── db.js               # MySQL connection pool
│   ├── server.js           # Express entry point
│   ├── .env.example        # Template env variables
│   └── package.json
├── frontend/
│   └── index.html          # Single-page app (vanilla JS)
└── sql/
    └── notes_db.sql        # Schema + sample data
```

---

## 1. Setup Lokal

### Prasyarat
- Node.js v18+
- MySQL 8.x berjalan di lokal

### Database

```bash
# Masuk ke MySQL
mysql -u root -p

# Import schema
mysql -u root -p < sql/notes_db.sql
```

### Backend

```bash
cd backend

# Install dependencies
npm install

# Buat file .env dari template
cp .env.example .env
# Edit .env sesuai konfigurasi MySQL kamu

# Jalankan server
npm start
# atau dev mode:
npm run dev
```

Server berjalan di: `http://localhost:3000`

### Frontend

Buka `frontend/index.html` langsung di browser, atau gunakan Live Server (VS Code).

---

## 2. API Endpoints

| Method | Endpoint           | Deskripsi           |
|--------|--------------------|---------------------|
| GET    | /api/health        | Health check        |
| GET    | /api/notes         | Ambil semua catatan |
| GET    | /api/notes/:id     | Ambil satu catatan  |
| POST   | /api/notes         | Tambah catatan baru |
| PUT    | /api/notes/:id     | Edit catatan        |
| DELETE | /api/notes/:id     | Hapus catatan       |

### Contoh Request (Postman / REST Client)

**POST /api/notes**
```json
{
  "judul": "Catatan Baru",
  "isi": "Isi catatan di sini."
}
```

**PUT /api/notes/1**
```json
{
  "judul": "Judul Diperbarui",
  "isi": "Isi yang sudah diedit."
}
```

---

## 3. Migrasi Database ke Cloud SQL / VM

### Export dari lokal

```bash
mysqldump -u root -p notes_db > notes_db_export.sql
```

### Import ke Cloud SQL (Google Cloud)

```bash
# Via gcloud CLI
gcloud sql import sql [INSTANCE_NAME] gs://[BUCKET]/notes_db_export.sql \
  --database=notes_db
```

### Import ke MySQL di VM

```bash
# Copy file ke VM
scp notes_db_export.sql user@[VM_IP]:~/

# SSH ke VM, lalu import
ssh user@[VM_IP]
mysql -u root -p notes_db < notes_db_export.sql
```

### Update .env untuk koneksi ke Cloud SQL / VM

```env
DB_HOST=34.xxx.xxx.xxx   # IP publik Cloud SQL atau VM
DB_PORT=3306
DB_USER=notes_user
DB_PASSWORD=your_password
DB_NAME=notes_db
```

---

## 4. Deploy Frontend ke VM (Bonus)

```bash
# Install nginx di VM
sudo apt update && sudo apt install nginx -y

# Copy frontend
scp frontend/index.html user@[VM_IP]:/var/www/html/

# Update API endpoint di index.html:
# Ganti http://localhost:3000 dengan http://[VM_IP]:3000

# Pastikan port 80 dan 3000 terbuka di firewall GCP
```

Frontend bisa diakses di: `http://[VM_IP]`

---

## 5. Struktur Tabel Database

```sql
CREATE TABLE notes (
  id             INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  judul          VARCHAR(255)  NOT NULL,
  isi            TEXT          NOT NULL,
  tanggal_dibuat DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

| Field          | Tipe          | Keterangan                    |
|----------------|---------------|-------------------------------|
| id             | INT UNSIGNED  | Primary key, auto increment   |
| judul          | VARCHAR(255)  | Judul catatan                 |
| isi            | TEXT          | Isi / konten catatan          |
| tanggal_dibuat | DATETIME      | Timestamp otomatis saat dibuat|
