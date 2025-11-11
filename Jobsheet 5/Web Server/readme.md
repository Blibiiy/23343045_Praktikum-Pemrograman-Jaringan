# **Laporan Praktikum 5: Web Server dan Express.js**

Laporan ini mendokumentasikan pengerjaan praktikum kelima untuk mata kuliah Pemrograman Berbasis Jaringan. Fokus dari praktikum ini adalah membangun sebuah web server fungsional menggunakan Express.js, sebuah kerangka kerja web Node.js.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 05 \- Web Server dan Express.js |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |
| **Direktori Kerja** | web-server |

## **Konsep Kunci & Teori Dasar**

Modul kelima ini mencakup konsep fundamental terkait pengembangan aplikasi web sisi server:

* **Web Server:** Pemahaman mengenai server web sebagai perangkat lunak (cth: server HTTP) yang memproses permintaan HTTP dari klien (browser) dan mengirimkan respons.  
* **Express.js:** Sebuah kerangka kerja (framework) web Node.js yang minimalis dan *unopinionated*, dirancang untuk mempermudah pembuatan aplikasi web dan API.  
* **Routing:** Proses mendefinisikan bagaimana aplikasi merespons permintaan klien ke *endpoint* tertentu. Ini diimplementasikan menggunakan metode seperti app.get().  
* **Static Assets:** File-file seperti HTML, CSS, JavaScript (sisi klien), dan gambar yang disajikan langsung ke klien. Express menyediakan *middleware* express.static() untuk tujuan ini.  
* **Template Engine (Handlebars.js):** Penggunaan *view engine* (seperti hbs) untuk me-*render* halaman HTML secara dinamis di sisi server, memungkinkan penyisipan data ke dalam template.  
* **Partials:** Komponen template (seperti header atau footer) yang dapat digunakan kembali di berbagai halaman untuk mengurangi duplikasi kode.  
* **Wildcard Routes:** Penggunaan karakter \* dalam definisi rute untuk menangani pola URL yang dinamis atau untuk membuat halaman "404 Not Found" kustom.

## **Eksperimen dan Hasil**

Serangkaian latihan dikerjakan di dalam direktori web-server.

### **1\. Inisiasi Proyek dan Instalasi Express**

Proyek diawali dengan membuat direktori web-server dan menginisialisasinya menggunakan npm init \-y. Dependensi *framework* Express.js (npm install express) diinstal. Struktur direktori (public dan src) dibuat untuk organisasi kode.

### **2\. Pembuatan Rute Dasar (app.get)**

File src/app.js dibuat. *Instance* Express diinisialisasi (const app \= express()). Rute-rute dasar untuk halaman utama (''), /bantuan, /tentang, dan /infoCuaca didefinisikan menggunakan app.get(). Metode res.send() digunakan untuk mengirim respons teks sederhana ke klien. Server dijalankan menggunakan app.listen(4000).

### **3\. Penyajian Konten HTML dan JSON**

Metode res.send() diuji untuk mengirim berbagai tipe konten.

* HTML dikirim secara *inline* (cth: res.send('\<h1\>Selamat datang\</h1\>')).  
* Data JSON dikirim (cth: res.send(\[{ nama: '...' }\])), yang secara otomatis direspons oleh Express dengan Content-Type: application/json.

### **4\. Konfigurasi Static Asset (Middleware)**

Untuk menyajikan file statis:

* Modul path bawaan Node.js digunakan untuk mengkonstruksi jalur direktori absolut.  
* Direktori public didefinisikan sebagai *root* untuk file statis: const direktoriPublic \= path.join(\_\_dirname, '../public').  
* *Middleware* express.static() dikonfigurasi: app.use(express.static(direktoriPublic)).  
* File statis (HTML, CSS, JS, dan gambar) berhasil ditempatkan di dalam folder public dan diakses melalui browser.

### **5\. Implementasi Template Engine (Handlebars)**

Untuk membuat konten dinamis:

* *Package* hbs diinstal (npm install hbs).  
* Express dikonfigurasi untuk menggunakan hbs sebagai *view engine*: app.set('view engine', 'hbs').  
* Secara *default*, Express akan mencari *template* di folder views.  
* Rute app.get() dimodifikasi dari res.send() menjadi res.render('index', { ... }) untuk mengirim data (objek JavaScript) ke *template*.  
* File .hbs dibuat di dalam folder views, menggunakan sintaks *mustache* (cth: {{judul}}, {{nama}}) untuk menampilkan data dinamis.

### **6\. Kustomisasi Path dan Partials**

Struktur *template* disempurnakan:

* Lokasi *default* views diubah ke templates/views menggunakan app.set('views', direktoriViews).  
* Direktori untuk *partials* (templates/partials) didefinisikan.  
* *Partials* (seperti header.hbs dan footer.hbs) didaftarkan ke hbs menggunakan hbs.registerPartials(direktoriPartials).  
* *Template* di dalam templates/views (cth: index.hbs) diperbarui untuk menggunakan *partials* dengan sintaks {{\>header}} dan {{\>footer}}, yang berhasil mengurangi duplikasi kode.

### **7\. Penanganan Halaman 404 (Wildcard Routes)**

Untuk menangani halaman yang tidak ditemukan:

* Rute *wildcard* spesifik dibuat (app.get('/bantuan/\*', ...)) untuk menangani artikel bantuan yang tidak ditemukan.  
* Rute *wildcard* umum (app.get('\*', ...)) ditempatkan di akhir definisi rute untuk menangkap semua URL yang tidak cocok.  
* Kedua rute *wildcard* ini dikonfigurasi untuk me-*render* *template* 404.hbs, dengan mengirimkan pesan kesalahan kustom.

## **Kesimpulan Praktikum**

Praktikum kelima ini telah berhasil diselesaikan. Pemahaman mengenai alur kerja pengembangan web server dasar menggunakan Express.js telah dicapai. Poin-poin kesimpulan adalah sebagai berikut:

* Pembuatan server HTTP dan definisi *routing* dasar dapat dilakukan secara efisien menggunakan Express.js (app.get, app.listen).  
* Express mempermudah penyajian file statis (HTML, CSS, JS) melalui penggunaan *middleware* express.static().  
* Konten dinamis sisi server diimplementasikan menggunakan *template engine* hbs, dengan memanfaatkan res.render() untuk mengirim data ke *template*.  
* Struktur *template* yang efisien dan *reusable* dapat dicapai dengan mengimplementasikan *partials* (cth: header, footer) dan mendaftarkannya melalui hbs.registerPartials().  
* Penanganan kesalahan untuk rute yang tidak ditemukan (404) dapat dikelola secara efektif menggunakan rute *wildcard* (\*) di akhir konfigurasi rute.