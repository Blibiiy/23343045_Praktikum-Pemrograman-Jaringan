# **Laporan Praktikum 6: JSON HTTP Endpoints**

Laporan ini mendokumentasikan pengerjaan praktikum keenam untuk mata kuliah Pemrograman Berbasis Jaringan. Fokus dari praktikum ini adalah mengubah *endpoint* web server Express.js agar dapat menyajikan data dinamis dalam format JSON.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 06 \- JSON HTTP Endpoints |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |
| **Direktori Kerja** | web-server |

## **Konsep Kunci & Teori Dasar**

Modul keenam ini melanjutkan pengembangan aplikasi web-server dari modul sebelumnya, dengan fokus pada pembuatan API internal:

* **JSON HTTP Endpoints:** Pemahaman mengenai URL pada server yang secara spesifik dirancang untuk menerima permintaan dan mengembalikan data dalam format JSON, bukan HTML.  
* **req.query:** Objek pada Express.js yang menyimpan properti dari *query string* (parameter) yang dikirimkan dalam URL. Contoh: untuk .../url?address=padang, req.query.address akan bernilai "padang".  
* **Modularisasi Kode API:** Memisahkan logika panggilan API eksternal (geocode dan prediksi cuaca) dari file app.js utama ke dalam modul terpisah di direktori utils untuk meningkatkan keterbacaan dan *reusability*.  
* **Client-Side Fetch:** Penggunaan fetch() API bawaan browser dari file JavaScript sisi klien (public/js/app.js) untuk membuat permintaan HTTP asinkron ke *endpoint* JSON milik server itu sendiri.

## **Eksperimen dan Hasil**

Serangkaian latihan dikerjakan untuk mentransformasi aplikasi web-server dari penyaji halaman statis menjadi aplikasi interaktif berbasis API.

### **1\. Modifikasi Endpoint /infocuaca**

*Endpoint* /infocuaca yang sebelumnya menyajikan data JSON statis, diubah menjadi dinamis.

* Logika ditambahkan untuk memeriksa keberadaan req.query.address.  
* Jika address tidak disediakan, server akan mengembalikan respons JSON berisi pesan kesalahan: res.send({ error: '...' }).  
* Jika address ada, server akan mengembalikan data JSON yang menyertakan alamat tersebut, sebagai langkah awal sebelum integrasi API.

### **2\. Integrasi API Backend dan Modularisasi**

Logika untuk mengakses API eksternal (Mapbox dan Weatherstack) diimplementasikan dan di-refactor:

* *Package* postman-request diinstal kembali untuk proyek ini.  
* Direktori src/utils dibuat.  
* File src/utils/geocode.js dan src/utils/prediksiCuaca.js dibuat. Logika pemanggilan API dari modul 3 dipindahkan ke dalam file-file ini, diekspor sebagai fungsi yang menerima *callback*.  
* *Endpoint* app.get('/infocuaca', ...) di app.js utama diperbarui:  
  1. geocode.js dan prediksiCuaca.js di-import.  
  2. Fungsi geocode dipanggil menggunakan req.query.address.  
  3. Dalam *callback* geocode (setelah mendapatkan latitude/longitude), fungsi forecast dipanggil.  
  4. Dalam *callback* forecast (setelah mendapatkan data cuaca), respons JSON dinamis terakhir dikirim ke klien: res.send({ prediksiCuaca: ..., lokasi: ..., address: ... }).

### **3\. Implementasi Interaksi Sisi Klien (Fetch API)**

Halaman utama (index.hbs) diubah menjadi antarmuka interaktif:

* File templates/views/index.hbs dimodifikasi dengan menambahkan elemen \<form\> yang berisi \<input\> dan \<button\>, serta dua paragraf kosong (\<p id="pesan-1"\> dan \<p id="pesan-2"\>) untuk menampilkan hasil.  
* File JavaScript sisi klien (public/js/app.js) dibuat/dimodifikasi:  
  1. Elemen form, input, dan paragraf pesan dipilih menggunakan document.querySelector.  
  2. Sebuah *event listener* submit ditambahkan ke form.  
  3. Di dalam *listener*, event.preventDefault() dipanggil untuk mencegah *reload* halaman.  
  4. Nilai dari input lokasi diambil.  
  5. fetch() API digunakan untuk memanggil *endpoint* internal server: fetch('/infocuaca?address=' \+ location).  
  6. Respons JSON yang diterima dari server kemudian diolah dan ditampilkan di dalam paragraf pesan-1 dan pesan-2, baik untuk data sukses maupun pesan *error*.  
* Tag \<script src="/js/app.js"\>\</script\> dipindahkan dari \<head\> ke bagian akhir \<body\> di index.hbs untuk memastikan DOM telah dimuat sebelum skrip dieksekusi.

## **Kesimpulan Praktikum**

Praktikum keenam ini telah berhasil diselesaikan. Aplikasi web-server kini tidak hanya menyajikan halaman, tetapi juga menyediakan JSON HTTP Endpoint yang fungsional. Poin-poin kesimpulan adalah sebagai berikut:

* Pembuatan *endpoint* JSON dinamis menggunakan Express.js telah berhasil diimplementasikan.  
* Penanganan parameter kueri URL (req.query) untuk menerima input dari pengguna telah dikuasai.  
* Logika bisnis (panggilan API) telah berhasil dimodularisasi ke dalam file terpisah (utils), meningkatkan kualitas kode.  
* Interaksi *full-stack* telah dicapai: skrip sisi klien (public/js/app.js) berhasil mengonsumsi API internal (/infocuaca) yang disediakan oleh server Express.js itu sendiri menggunakan fetch().