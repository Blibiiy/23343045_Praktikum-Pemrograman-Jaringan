# **Laporan Praktikum 1: Pengantar Node.js**

Repository ini mendokumentasikan pengerjaan praktikum pertama untuk mata kuliah **Pemrograman Berbasis Jaringan**. Fokus dari praktikum ini adalah untuk melakukan setup lingkungan pengembangan Node.js dan memahami konsep dasarnya sebagai platform untuk aplikasi jaringan.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 1 \- Pengantar Node.js |
| **Penyusun** | \[Muhammad Isra Al Fattah\] |
| **NIM** | \[23343045\] |

## **Konsep Kunci yang Dipelajari**

Sebelum memulai praktikum, materi berfokus pada beberapa konsep fundamental:

* **Arsitektur Klien-Pelayan (Client-Server):** Model dasar komunikasi jaringan di mana Klien (cth: browser) membuat permintaan (request) dan Pelayan (server) memberikan tanggapan (response).  
* **Node.js sebagai Runtime:** Pemahaman bahwa Node.js bukanlah bahasa baru, melainkan sebuah **lingkungan runtime** yang memungkinkan JavaScript (yang biasanya berjalan di browser) untuk dieksekusi di sisi server.  
* **Asinkron & Event Loop:** Keunggulan utama Node.js adalah model I/O-nya yang *non-blocking* dan asinkron. Berkat *Event Loop*, Node.js dapat menangani ribuan koneksi secara efisien tanpa harus "menunggu" satu per satu tugas selesai.

## **Setup & Verifikasi Lingkungan**

Langkah pertama adalah mempersiapkan *toolchain* (perangkat) yang diperlukan.

1. **Instalasi Perangkat Lunak:**  
   * **Visual Studio Code:** Diinstal sebagai editor kode utama.  
   * **Node.js (LTS):** Diinstal sebagai runtime environment. Ini juga secara otomatis menginstal **NPM (Node Package Manager)**.  
2. Verifikasi Instalasi:  
   Setelah instalasi, dilakukan pengecekan versi melalui terminal untuk memastikan semua terpasang dengan benar.  
   **Perintah Verifikasi:**  
   node \-v  
   npm \-v

   **Hasil Verifikasi:**  
   v20.5.0  (atau versi lain yang terinstal)  
   9.8.0   (atau versi lain yang terinstal)

## **Eksperimen dan Hasil**

Praktikum ini melibatkan dua eksperimen utama untuk menguji lingkungan Node.js.

### **Eksperimen 1: Eksekusi Skrip Sederhana**

Eksperimen pertama bertujuan untuk membuktikan bahwa runtime Node.js dapat mengeksekusi file JavaScript dasar.

**Kode Program (hello.js):**

// hello.js  
console.log('Welcome to Node.js\!');

Eksekusi & Hasil:  
Skrip dijalankan menggunakan perintah node di terminal, yang menghasilkan output teks sesuai perintah.  
\> node hello.js  
Welcome to Node.js\!

### **Eksperimen 2: Server HTTP Pertama Saya**

Eksperimen kedua adalah inti dari praktikum: membuat dan menjalankan server web HTTP fungsional yang merespons permintaan browser.

**Kode Program (hello-world.js):**

// 1\. Memuat modul http bawaan Node.js  
const http \= require('http');

// 2\. Konfigurasi alamat server (localhost) dan port  
const hostname \= '127.0.0.1';  
const port \= 3000;

// 3\. Membuat instance server  
// Fungsi callback ini akan dieksekusi setiap kali ada request masuk  
const server \= http.createServer((req, res) \=\> {  
  // 4\. Mengatur response header (status OK dan tipe konten)  
  res.statusCode \= 200;  
  res.setHeader('Content-Type', 'text/plain');  
    
  // 5\. Menulis isi response dan mengakhirinya  
  res.end('Hello World');  
});

// 6\. Menjalankan server agar "mendengarkan" di port dan hostname  
server.listen(port, hostname, () \=\> {  
  console.log(\`Server running at http://${hostname}:${port}/\`);  
});

Eksekusi & Hasil:  
Server dijalankan dari terminal. Tidak seperti skrip sebelumnya, proses ini tidak berhenti, menandakan server sedang aktif "mendengarkan" koneksi.  
**Hasil di Terminal:**

\> node hello-world.js  
Server running at \[http://127.0.0.1:3000/\](http://127.0.0.1:3000/)

Hasil di Browser:  
Saat mengakses http://127.0.0.1:3000 di browser, server berhasil merespons dan browser menampilkan teks Hello World.

## **Analisis & Pembahasan Tugas**

Praktikum ini diakhiri dengan satu pertanyaan analisis untuk memperdalam pemahaman tentang teknologi yang digunakan.

**Pertanyaan:** Jelaskan tentang JavaScript Engine, V8, dan bagaimana perbedaan antara Node.js dan JavaScript Engine pada browser Google Chrome?

**Jawaban Analisis:**

1. **JavaScript Engine (Mesin JavaScript)** adalah program yang mengeksekusi kode JavaScript. Setiap browser memiliki engine-nya sendiri (cth: V8 di Chrome, SpiderMonkey di Firefox).  
2. **V8 Engine** adalah JavaScript Engine *open-source* performa tinggi buatan Google yang ditulis dalam C++. V8 inilah yang menjadi "otak" di dalam Google Chrome sekaligus "mesin" utama yang digunakan oleh Node.js.  
3. Perbedaan Kunci (Node.js vs. Browser):  
   Meskipun sama-sama menggunakan V8, lingkungan eksekusinya sangat berbeda:  
   * **Lingkungan & API:**  
     * **Browser:** Berjalan di lingkungan yang "terisolasi" (sandbox) di dalam browser. V8 memiliki akses ke API Web seperti window, document (untuk manipulasi DOM/HTML), location, dan fetch. Tujuannya adalah untuk interaktivitas UI.  
     * **Node.js:** Berjalan langsung di sistem operasi. V8 memiliki akses ke API sisi server yang *tidak ada* di browser, seperti fs (File System, untuk baca/tulis file), http (untuk membuat server), path, dan process (info sistem).  
   * **Tujuan:**  
     * **Browser:** Menjalankan skrip di sisi klien untuk memanipulasi tampilan web dan berinteraksi dengan pengguna.  
     * **Node.js:** Menjalankan skrip di sisi server untuk membangun aplikasi backend, mengelola database, dan membuat API.

## **Kesimpulan Praktikum**

Praktikum Modul 1 telah berhasil diselesaikan. Seluruh perangkat lunak yang dibutuhkan telah terinstal dan terverifikasi.

Praktikan telah berhasil **menjalankan skrip JavaScript sederhana** dan **membuat server HTTP fungsional** menggunakan runtime Node.js. Pemahaman mengenai perbedaan fundamental antara eksekusi JavaScript di sisi klien (browser) dan sisi server (Node.js) juga telah didokumentasikan dalam analisis tugas.