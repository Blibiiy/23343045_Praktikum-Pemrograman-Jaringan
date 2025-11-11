# **🚀 Laporan Praktikum 2: Node.js Module System & Command Line Arguments**

Laporan ini mendokumentasikan pengerjaan praktikum kedua untuk mata kuliah **Pemrograman Berbasis Jaringan**. Fokus dari praktikum ini adalah pendalaman dua konsep inti Node.js: **Module System** (CommonJS) dan **Command Line Arguments** (process.argv dan Yargs).

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 2 \- Node.js Module System dan Command Line Arguments |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |

## **💡 Konsep Kunci & Teori Dasar**

Modul kedua ini mencakup beberapa konsep fundamental dalam pengembangan aplikasi Node.js:

* **Node.js Module System:** Pemahaman mengenai standar **CommonJS** untuk mengorganisasi kode. Ini mencakup:  
  * require(): Fungsi untuk mengimpor modul (baik modul bawaan, modul lokal, atau dari npm).  
  * module.exports: Objek khusus untuk mengekspor fungsionalitas (fungsi, objek, variabel) dari satu file agar bisa digunakan di file lain.  
* **NPM (Node Package Manager):** Penggunaan NPM untuk inisialisasi proyek (npm init yang menghasilkan package.json) dan mengelola dependensi eksternal (npm install \<package-name\>).  
* **Command Line Arguments:** Mempelajari cara membuat aplikasi CLI (Command Line Interface) yang interaktif:  
  * process.argv: Array bawaan Node.js untuk mengakses argumen mentah dari terminal.  
  * yargs: *Package* eksternal yang jauh lebih canggih untuk *parsing* argumen dan membuat perintah (command) yang terstruktur.  
* **Manipulasi Data JSON:** Teknik untuk menyimpan data secara persisten ke dalam file menggunakan format JSON, dengan memanfaatkan modul fs (File System) serta fungsi JSON.stringify() (object ke string) dan JSON.parse() (string ke object).

## **🔬 Eksperimen dan Hasil**

Serangkaian latihan dikerjakan di dalam direktori buku-catatan.

### **1\. Eksplorasi Node.js Module System**

Tiga jenis *import* modul diuji dalam praktikum ini.

1. Import Core Module (fs):  
   Modul bawaan fs (File System) digunakan untuk berinteraksi dengan file.  
   * fs.writeFileSync('catatan.txt', ...): Berhasil membuat file catatan.txt dan menulis konten ke dalamnya.  
   * fs.appendFileSync('catatan.txt', ...): Berhasil menambahkan konten baru ke file catatan.txt yang sudah ada tanpa menimpanya.  
2. Import File Lokal (./catatan.js):  
   Pemisahan kode dipraktikkan dengan membuat file catatan.js dan mengekspor sebuah fungsi menggunakan module.exports \= ambilCatatan. Di file app.js, modul ini diimpor menggunakan const catatan \= require('./catatan.js') dan fungsinya berhasil dipanggil.  
3. Import NPM Package (validator):  
   Penggunaan modul eksternal dipraktikkan sebagai berikut:  
   * Proyek diinisialisasi dengan npm init, yang membuat file package.json.  
   * *Package* validator diinstal (npm i validator@13.11.0). Proses ini membuat folder node\_modules dan file package-lock.json.  
   * Di app.js, *package* diimpor (const validator \= require('validator')) dan fungsinya berhasil digunakan (validator.isURL('https://proska.com')).

### **2\. Latihan Tambahan (chalk & nodemon)**

* **Chalk:** *Package* chalk@4.1.2 diinstal dan berhasil digunakan untuk mencetak teks berwarna di terminal, yang berguna untuk *feedback* visual (cth: pesan sukses atau error).  
* **Nodemon:** *Package* nodemon diinstal secara global (npm install nodemon \-g). Saat aplikasi dijalankan dengan nodemon app.js, server otomatis *restart* setiap kali ada perubahan pada file, yang secara signifikan mempercepat proses *debugging*.

### **3\. Eksplorasi Command Line Arguments**

Praktikum ini membandingkan dua metode untuk mengambil input dari terminal.

1. **Menggunakan process.argv (Cara Manual):**  
   * Observasi process.argv menunjukkan bahwa ini adalah sebuah array, di mana process.argv\[2\] merupakan input pertama dari pengguna.  
   * Logika if/else sederhana berhasil dibuat untuk membedakan perintah node app.js tambah dan node app.js hapus.  
2. **Menggunakan yargs (Cara Profesional):**  
   * *Package* yargs diinstal untuk *parsing* argumen yang lebih canggih.  
   * *Command* baru didefinisikan menggunakan yargs.command({ ... }).  
   * *Builder* ditambahkan pada *command* tambah untuk mendefinisikan opsi \--judul dan \--isi, lengkap dengan demandOption: true untuk menjadikannya wajib.  
   * Perintah seperti node app.js tambah \--judul="Catatan 1" \--isi="Isi catatan 1" berhasil dieksekusi.

### **4\. Studi Kasus: Aplikasi "Buku Catatan" (CRUD via CLI)**

Bagian terakhir adalah mengintegrasikan semua konsep untuk membuat aplikasi CLI "Buku Catatan" yang dapat **Menambah**, **Menghapus**, **Membaca**, dan **Mendaftar** catatan.

1. **Penyimpanan Data (JSON):**  
   * Fungsi simpanCatatan dibuat untuk mengambil array object, mengubahnya menjadi string JSON (JSON.stringify), dan menyimpannya ke catatan.json menggunakan fs.writeFileSync.  
   * Fungsi muatCatatan dibuat untuk membaca file (fs.readFileSync), mengubah buffer ke string (.toString()), dan mem-parsingnya (JSON.parse). Blok try...catch ditambahkan untuk menangani kasus jika file catatan.json belum ada (mengembalikan array kosong).  
2. **Fungsi "Tambah Catatan":**  
   * *Handler* yargs untuk *command* tambah dihubungkan agar memanggil fungsi tambahCatatan(argv.judul, argv.isi).  
   * Fungsi ini pertama-tama memuat catatan yang ada, lalu menggunakan filter untuk mengecek duplikasi judul (catatanGanda).  
   * Jika tidak ada duplikat, catatan baru akan di-push ke array dan array tersebut akan disimpan kembali ke file JSON.  
3. **Fungsi "Hapus Catatan":**  
   * *Builder* ditambahkan pada *command* hapus agar wajib menyertakan \--judul.  
   * *Handler*\-nya memanggil hapusCatatan(argv.judul).  
   * Fungsi ini memuat catatan, lalu menggunakan filter untuk membuat array baru (catatanUntukDisimpan) yang berisi semua catatan *kecuali* yang judulnya cocok dengan argumen.  
   * Array baru ini kemudian disimpan kembali, secara efektif menghapus data yang diinginkan. *Package* chalk digunakan untuk memberi pesan status (hijau untuk sukses, merah untuk error).  
4. **Fungsi Tambahan (Latihan):**  
   * Latihan diselesaikan dengan menambahkan *command* list (mencetak semua judul catatan) dan read (mencetak isi dari satu catatan berdasarkan judul).

## **✅ Kesimpulan Praktikum**

Praktikum kedua ini mencakup konsep fundamental Node.js. Dari pengerjaan praktikum, dapat disimpulkan:

* Struktur aplikasi Node.js dapat diorganisasi menggunakan sistem modul (lokal, bawaan, dan npm).  
* Instalasi dan manajemen *package* pihak ketiga dilakukan menggunakan NPM.  
* Aplikasi CLI yang interaktif dan *powerful* dapat dibuat menggunakan *package* yargs untuk *argument parsing*.  
* Pengalaman praktis dalam penyimpanan dan pemuatan data (persistensi) telah diperoleh dengan memanfaatkan file JSON dan modul fs.