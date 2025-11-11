# **Laporan Praktikum 3: HTTP Request dan API**

Laporan ini mendokumentasikan pengerjaan praktikum ketiga untuk mata kuliah Pemrograman Berbasis Jaringan. Fokus dari praktikum ini adalah memahami dan mengimplementasikan panggilan HTTP Request untuk berinteraksi dengan API eksternal.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 3 \- HTTP Request and API |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |
| **Direktori Kerja** | aplikasiCuaca |

## **Konsep Kunci & Teori Dasar**

Modul ketiga ini mencakup konsep fundamental terkait komunikasi aplikasi melalui jaringan:

* **HTTP Request:** Pemahaman mengenai protokol transfer data klien-server. Klien (aplikasi Node.js) mengirim *request* (GET, POST, dll.) ke sebuah *endpoint*, dan server merespons dengan data (seringkali dalam format JSON) beserta status code.  
* **API (Application Programming Interface):** Sebuah antarmuka yang mendefinisikan cara perangkat lunak berinteraksi satu sama lain. Dalam konteks ini, API web (seperti Weatherstack dan Mapbox) menyediakan *endpoint* URL yang dapat diakses untuk mengambil data.  
* **API Access Key/Token:** Mekanisme autentikasi untuk mengidentifikasi dan mengotorisasi klien yang melakukan request. Kunci ini biasanya disertakan sebagai parameter kueri (query parameter) dalam URL request.  
* **JSON (JavaScript Object Notation):** Format standar *de facto* untuk pertukaran data API. Data JSON yang diterima dari server perlu di-parsing menjadi objek JavaScript agar dapat diakses secara terstruktur.  
* **Manajemen Dependensi:** Penggunaan NPM untuk menginstal *package* pihak ketiga (postman-request) yang memfasilitasi pembuatan HTTP request di Node.js.

## **Eksperimen dan Hasil**

Serangkaian latihan dikerjakan di dalam direktori aplikasiCuaca.

### **1\. Persiapan API Keys**

Langkah awal adalah melakukan registrasi pada dua layanan API eksternal untuk mendapatkan kunci akses:

1. **Weatherstack:** Mendaftar di weatherstack.com untuk mendapatkan API Access Key guna mengakses data cuaca.  
2. **Mapbox:** Mendaftar di mapbox.com untuk mendapatkan Access Token guna mengakses API Geocoding (konversi nama lokasi ke koordinat).

### **2\. Inisiasi Proyek dan Dependensi**

Direktori proyek aplikasiCuaca diinisialisasi menggunakan npm init. Satu-satunya dependensi eksternal yang diperlukan untuk modul ini, postman-request, diinstal menggunakan perintah npm i postman-request.

### **3\. Akses API Weatherstack (Data Cuaca)**

Eksperimen pertama adalah melakukan panggilan API ke Weatherstack.

* URL request dibentuk dengan menggabungkan *base URL*, *endpoint* (/current), API *access key*, dan parameter kueri (query berisi latitude dan longitude).  
* *Package* postman-request digunakan untuk melakukan panggilan. Opsi json: true ditambahkan pada objek request untuk menginstruksikan *package* agar otomatis mem-parsing respons JSON.  
* Data *nested* (bersarang) dalam respons diakses, contohnya: response.body.current.temperature dan response.body.current.precip.  
* Parameter kueri tambahan (\&units=m) diuji untuk mengubah unit data yang diterima.

### **4\. Akses API Mapbox (Geocoding)**

Eksperimen kedua adalah melakukan panggilan ke API Geocoding Mapbox.

* URL request dibentuk menggunakan *endpoint* geocoding/v5/mapbox.places/, diikuti nama lokasi, dan diakhiri dengan *access token* serta parameter limit.  
* Request kembali dilakukan menggunakan postman-request dengan opsi json: true.  
* Data koordinat (latitude dan longitude) diekstraksi dari respons. Perlu dicatat bahwa data ini berada dalam struktur array: response.body.features\[0\].center\[1\] (latitude) dan response.body.features\[0\].center\[0\] (longitude).

### **5\. Latihan Integrasi dan Tampilan Data**

Latihan terakhir adalah menggabungkan kedua API untuk menampilkan laporan terpadu.

* Data spesifik (query, place\_name, place\_type) diekstrak dari hasil panggilan API Mapbox.  
* Data spesifik (temperature, precip, weather\_descriptions\[0\]) diekstrak dari hasil panggilan API Weatherstack.  
* Output akhir di terminal diformat untuk menampilkan informasi lokasi dari Mapbox dan informasi cuaca dari Weatherstack secara bersamaan, yang membuktikan kemampuan aplikasi untuk mengkonsumsi dan mengolah data dari beberapa sumber API.

## **Kesimpulan Praktikum**

Praktikum ketiga ini telah berhasil diselesaikan. Pemahaman mengenai alur kerja komunikasi API telah dicapai. Poin-poin kesimpulan adalah sebagai berikut:

* Pemahaman mengenai konsep HTTP Request dan respons API telah diperoleh.  
* Kemampuan untuk mendaftar dan mengelola API Access Keys dari layanan pihak ketiga (Weatherstack, Mapbox) telah didemonstrasikan.  
* Penggunaan *package* postman-request untuk melakukan panggilan HTTP (GET) dari dalam aplikasi Node.js telah diimplementasikan.  
* Kemampuan untuk mem-parsing data respons berformat JSON dan mengakses data *nested* (bersarang) di dalamnya, termasuk data di dalam array, telah terbukti.  
* Aplikasi berhasil mengintegrasikan data dari dua sumber API yang berbeda untuk menghasilkan output gabungan.