
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
- **Database** → MySQL dengan 4 tabel yang saling berelasi



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

<img width="429" height="82" alt="Image" src="https://github.com/user-attachments/assets/06446475-19d8-4839-9756-f63fa7151291" />

### Tabel `supplier`


<img width="410" height="80" alt="Image" src="https://github.com/user-attachments/assets/b5df64b4-6e35-4a3e-9759-6e0839116166" />

### Tabel `barang`

<img width="334" height="82" alt="Image" src="https://github.com/user-attachments/assets/e3854f6e-29c5-4aa4-9f7c-ac1eb493171d" />

### Tabel `users`

<img width="349" height="42" alt="Image" src="https://github.com/user-attachments/assets/c5950148-b11c-46df-a4ab-06e74ff4edb1" />


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

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/fdb43a92-4d44-4d64-8791-20b03d248326" />

### 2. Halaman Login

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/c8f6f3d7-e23e-4174-a169-19d1d74074f0" />


### 3. Dashboard Admin


<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/a9f54597-3c4c-4133-9ca2-1db48d9c547e" />


### 4. Kelola Barang


<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/1abd29d6-d932-4bd7-be1e-2f92bc3f486d" />


### 5. Form Tambah / Edit Barang

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/ce21a86c-ac71-4f97-adf0-b8ea1b782839" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/25b378c5-900b-47d0-8c87-61a63c344fcc" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/035a7088-1472-4669-a9f3-d8291d1b48c0" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/0a9d701b-f483-4019-b744-60b18af3334c" />


### 6. Kelola Kategori


<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/1b172002-6f8f-4235-bb8d-11c31bcde4f4" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/5b5656cb-ff30-4554-afee-4584021039bc" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/8bdbf0d5-b248-419e-877a-f092c160f6e2" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/098365fe-34ac-4b3c-be17-68c6871b66a0" />


### 7. Kelola Supplier

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/44190b80-b83b-4ee4-9d5d-f519c2e2cec0" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/5582d8b0-825a-42e5-beab-ae84d973c951" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/9a9f4d61-0473-41d4-ae37-cdb0be8cd652" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/10761b4b-bd6e-4c99-9c32-93217ce6c3a0" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/f7f58c8e-2b32-4aaf-8791-623ec4d64bb1" />

### 8. Pengujian Postman — 401 Unauthorized

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/3bfacc99-1921-403d-907f-2c9fc7e41ea1" />

### 9. DevTools Network — Authorization Header

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/66da883a-55f3-46aa-8ee9-bb1728f0d51c" />

<img width="960" height="504" alt="Image" src="https://github.com/user-attachments/assets/54790469-cfec-4475-9069-328c095ad784" />

### 10. Skema Database phpMyAdmin
📸 [Screenshot relasi tabel di phpMyAdmin Designer]

---

## Link

- **Video Presentasi YouTube:** https://youtu.be/IozxQqENGfk
- **Video Demo:** https://youtu.be/aN8N3eZDKPg
