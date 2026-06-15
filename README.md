
# UAS Pemrograman Web 2 — E-Inventory System

 **Nama** : Navyta Budi Yulia
 
 **NIM** : 312410184
 
 **Kelas** : I241B
 
 **Mata Kuliah** : Pemrograman Web 2 
 
 **Tema** : E-Inventory — Sistem Manajemen Inventaris Barang

## Deskripsi Proyek

E-Inventory System adalah aplikasi manajemen inventaris barang berbasis web yang dibangun menggunakan arsitektur **Decoupled (Terpisah)** antara Backend dan Frontend.

- **Backend** → CodeIgniter 4 sebagai RESTful API Server
- **Frontend** → VueJS 3 SPA dengan TailwindCSS
- **Autentikasi** → Token Bearer dengan CI4 Filters + Axios Interceptors


## Struktur Folder

```
UAS_Web2_NIM_Nama/
├── backend-api/                  
│   ├── app/
│   │   ├── Config/
│   │   │   ├── Cors.php          
│   │   │   ├── Filters.php       
│   │   │   └── Routes.php        
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── Auth.php      
│   │   │       ├── Barang.php    
│   │   │       ├── Kategori.php  
│   │   │       └── Supplier.php  
│   │   ├── Filters/
│   │   │   └── ApiAuthFilter.php 
│   │   └── Models/
│   │       ├── BarangModel.php
│   │       ├── KategoriModel.php
│   │       ├── SupplierModel.php
│   │       └── UserModel.php
│   └── public/
│       └── index.php
└── frontend-spa/                 
    ├── index.html
    └── assets/
        └── js/
            ├── app.js            
            └── components/
                ├── Login.js      
                ├── Layout.js     
                ├── Home.js       
                ├── Barang.js     
                ├── Kategori.js   
                └── Supplier.js   
```


## Skema Relasi Database

**Database:** `uas_inventory`

📸 [Screenshot desainer database phpMyAdmin]

### Tabel `kategori`
| Kolom | Tipe | Keterangan |

<img width="429" height="82" alt="Image" src="https://github.com/user-attachments/assets/06446475-19d8-4839-9756-f63fa7151291" />

### Tabel `supplier`


<img width="410" height="80" alt="Image" src="https://github.com/user-attachments/assets/b5df64b4-6e35-4a3e-9759-6e0839116166" />

### Tabel `barang`


### Tabel `users`

<img width="349" height="42" alt="Image" src="https://github.com/user-attachments/assets/c5950148-b11c-46df-a4ab-06e74ff4edb1" />

<img width="410" height="80" alt="Image" src="https://github.com/user-attachments/assets/b5df64b4-6e35-4a3e-9759-6e0839116166" />

<img width="429" height="82" alt="Image" src="https://github.com/user-attachments/assets/06446475-19d8-4839-9756-f63fa7151291" />

<img width="334" height="82" alt="Image" src="https://github.com/user-attachments/assets/e3854f6e-29c5-4aa4-9f7c-ac1eb493171d" />

## API Endpoint

| Method | Endpoint | Auth | Keterangan |
|---|---|---|---|
| POST | /api/login | ✗ | Login & dapatkan token |
| GET | /api/barang | ✗ | Ambil semua barang + relasi |
| POST | /api/barang | ✓ | Tambah barang |
| PUT | /api/barang/{id} | ✓ | Update barang |
| DELETE | /api/barang/{id} | ✓ | Hapus barang |
| GET | /api/kategori | ✗ | Ambil semua kategori |
| POST | /api/kategori | ✓ | Tambah kategori |
| PUT | /api/kategori/{id} | ✓ | Update kategori |
| DELETE | /api/kategori/{id} | ✓ | Hapus kategori |
| GET | /api/supplier | ✗ | Ambil semua supplier |
| POST | /api/supplier | ✓ | Tambah supplier |
| PUT | /api/supplier/{id} | ✓ | Update supplier |
| DELETE | /api/supplier/{id} | ✓ | Hapus supplier |

> ✓ = Membutuhkan Authorization: Bearer {token}

---

## Fitur Keamanan

### Server-Side (Backend CI4)
- **ApiAuthFilter** — memproteksi semua endpoint POST/PUT/DELETE
- Endpoint hanya bisa diakses dengan Bearer Token valid di HTTP Header
- **CORS Filter** — dikonfigurasi global agar frontend bisa akses API

### Client-Side (Frontend VueJS)
- **Navigation Guards** dengan `meta: { requiresAuth: true }` — redirect ke login jika belum login
- **Axios Request Interceptor** — token dari localStorage disuntik otomatis ke setiap request
- **Axios Response Interceptor** — tangkap error 401, tampilkan alert, redirect ke login otomatis


## Hak Akses Pengguna

| Halaman | Pengunjung (Tanpa Login) | Admin (Sudah Login) |
|---|---|---|
| Beranda / Landing Page |  Bisa akses |  Bisa akses |
| Dashboard |  Redirect ke login |  Bisa akses |
| Kelola Barang |  Redirect ke login |  CRUD |
| Kelola Kategori |  Redirect ke login |  CRUD |
| Kelola Supplier |  Redirect ke login |  CRUD |


## Cara Menjalankan

### Prasyarat
- XAMPP (Apache + MySQL aktif)
- Browser modern (Chrome/Firefox/Edge)

### Langkah-langkah

1. Clone repository ke `C:\xampp\htdocs\`
2. Buka XAMPP → Start **Apache** dan **MySQL**
3. Buka phpMyAdmin → buat database `uas_inventory`
4. Jalankan query SQL untuk membuat tabel dan data awal
5. Buka browser:
   - **Frontend:** `http://localhost/UAS_Web2/frontend-spa/`
   - **API:** `http://localhost/UAS_Web2/backend-api/public/api/barang`

### Akun Login
| Field | Value |
|---|---|
| Username | admin |
| Password | admin123 |

---

## Screenshot

### 1. Halaman Beranda Publik (Tanpa Login)
📸 [Screenshot landing page dengan ringkasan data]

### 2. Halaman Login
📸 [Screenshot form login]

### 3. Dashboard Admin
📸 [Screenshot dashboard setelah login]

### 4. Kelola Barang
📸 [Screenshot tabel barang]

### 5. Form Tambah / Edit Barang
📸 [Screenshot modal form barang]

### 6. Kelola Kategori
📸 [Screenshot tabel kategori]

### 7. Kelola Supplier
📸 [Screenshot tabel supplier]

### 8. Pengujian Postman — 401 Unauthorized
📸 [Screenshot Postman response 401 tanpa token]

### 9. DevTools Network — Authorization Header
📸 [Screenshot DevTools menunjukkan Bearer token otomatis]

### 10. Skema Database phpMyAdmin
📸 [Screenshot relasi tabel di phpMyAdmin Designer]

---

## Link

- **Repository GitHub:** [Link GitHub]
- **Video Presentasi YouTube:** [Link YouTube]
- **Form Pengumpulan:** https://forms.gle/WZLj2XDxPupppc869
