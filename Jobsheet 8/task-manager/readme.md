# **Laporan Praktikum 8: MongoDB and No-SQL Databases**

Laporan ini mendokumentasikan pengerjaan praktikum kedelapan untuk mata kuliah Pemrograman Berbasis Jaringan. Fokus dari praktikum ini adalah memahami konsep basis data NoSQL dan mengimplementasikan operasi CRUD (Create, Read, Update, Delete) menggunakan MongoDB.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 08 \- MongoDB and No-SQL Databases |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |
| **Direktori Kerja** | task-manager |

## **Konsep Kunci & Teori Dasar**

Modul kedelapan ini mencakup konsep fundamental terkait sistem manajemen basis data modern:

* **Database Server:** Pemahaman mengenai sistem perangkat lunak yang mengelola, menyimpan, dan mengambil data secara terstruktur.  
* **SQL vs. NoSQL:** Perbandingan antara basis data relasional (SQL) yang berbasis skema kaku (tabel, baris, kolom) dan basis data non-relasional (NoSQL) yang menawarkan skema fleksibel (cth: dokumen, *key-value*, graf).  
* **MongoDB:** Sebuah implementasi basis data NoSQL berorientasi dokumen. Data disimpan dalam format mirip JSON (disebut BSON) yang fleksibel.  
* **Terminologi MongoDB:** Pemahaman padanan istilah dari SQL ke MongoDB:  
  * Database \-\> Database  
  * Tabel (Table) \-\> Koleksi (Collection)  
  * Baris (Row) \-\> Dokumen (Document)  
  * Kolom (Column) \-\> Bidang (Field)  
* **ObjectId:** Sebuah tipe data unik 12-byte yang digenerasi oleh MongoDB sebagai *primary key* (\_id) untuk setiap dokumen.  
* **MongoDB Driver:** Penggunaan *package* mongodb dari NPM untuk menghubungkan aplikasi Node.js dengan server MongoDB.

## **Eksperimen dan Hasil**

Serangkaian latihan dikerjakan di dalam direktori task-manager.

### **1\. Instalasi Perangkat Lunak**

Langkah pertama adalah penyiapan lingkungan basis data:

* **MongoDB Community Server:** Diinstal sebagai layanan (*service*) pada sistem operasi lokal.  
* **MongoDB Compass:** Diinstal sebagai antarmuka pengguna grafis (GUI) resmi untuk mengelola dan memvisualisasikan data di server MongoDB.  
* Koneksi ke server lokal (mongodb://localhost:27017) melalui Compass telah diverifikasi.

### **2\. Inisiasi Proyek dan Koneksi**

Proyek task-manager diinisialisasi (npm init \-y) dan *driver* MongoDB diinstal (npm i mongodb@6.2.0).

### **3\. Operasi CREATE (Insert)**

File insertDocument.js dibuat untuk menguji penambahan data.

* MongoClient diimpor dan digunakan untuk terhubung ke server.  
* Koneksi berhasil dibuat ke basis data task-manager (otomatis dibuat jika belum ada).  
* **insertOne()**: Sebuah dokumen tunggal berhasil dimasukkan ke dalam koleksi pengguna dengan \_id kustom yang digenerasi menggunakan new ObjectId().  
* **insertMany()**: Tiga dokumen berhasil dimasukkan ke dalam koleksi tugas dalam satu operasi.  
* Hasil penambahan data diverifikasi melalui MongoDB Compass.

### **4\. Operasi READ (Query)**

File readDocument.js dibuat untuk menguji pencarian data.

* **findOne() (by Field)**: Pencarian dokumen menggunakan kriteria spesifik (cth: { nama: 'Randi' }) berhasil diimplementasikan.  
* **findOne() (by ID)**: Pencarian dokumen menggunakan \_id spesifik, dengan membungkus string ID ke dalam new ObjectId("..."), berhasil dilakukan.  
* **find() dan toArray()**: Pencarian beberapa dokumen (cth: { usia: 28 }) diimplementasikan. Metode find() mengembalikan *cursor*, yang kemudian diubah menjadi array menggunakan .toArray().

### **5\. Operasi UPDATE**

File updateDocument.js dibuat untuk menguji modifikasi data.

* **updateOne()**: Digunakan untuk memodifikasi satu dokumen.  
  * Operator **$set** (cth: { $set: { nama: 'Randikun' } }) berhasil digunakan untuk mengubah nilai sebuah *field*.  
  * Operator **$inc** (cth: { $inc: { usia: 1 } }) berhasil digunakan untuk menambah nilai numerik pada *field*.  
* **updateMany()**: Digunakan untuk memodifikasi semua dokumen yang cocok dengan filter (cth: mengubah { StatusPenyelesaian: false } menjadi true untuk semua dokumen di koleksi tugas).  
* Hasil operasi (seperti modifiedCount) diobservasi di terminal dan perubahan data diverifikasi di MongoDB Compass.

### **6\. Operasi DELETE**

File deleteDocument.js dibuat untuk menguji penghapusan data.

* **deleteMany()**: Berhasil digunakan untuk menghapus semua dokumen yang cocok dengan kriteria filter (cth: { usia: 28 }). Jumlah data yang terhapus (deletedCount) ditampilkan di terminal.  
* Latihan tambahan untuk mengimplementasikan **deleteOne()** juga diselesaikan (tidak ditunjukkan dalam skrip utama).

## **Kesimpulan Praktikum**

Praktikum kedelapan ini telah berhasil diselesaikan. Pemahaman mengenai perbedaan fundamental basis data SQL dan NoSQL serta implementasi praktis MongoDB telah dicapai. Poin-poin kesimpulan adalah sebagai berikut:

* Pemahaman mengenai konsep basis data NoSQL berorientasi dokumen telah diperoleh.  
* Server MongoDB dan GUI MongoDB Compass berhasil diinstal dan dikonfigurasi.  
* Aplikasi Node.js berhasil terhubung ke server MongoDB menggunakan *driver* mongodb.  
* Seluruh operasi CRUD (Create, Read, Update, Delete) telah berhasil diimplementasikan menggunakan metode-metode *driver* MongoDB (cth: insertOne, findOne, find, updateOne, updateMany, deleteMany).  
* Pemahaman mengenai penggunaan ObjectId untuk referensi dokumen dan operator atomik (seperti $set dan $inc) telah didemonstrasikan.