Laporan Praktikum 9: Socket Programming

Laporan ini mendokumentasikan pengerjaan praktikum kesembilan untuk mata kuliah Pemrograman Berbasis Jaringan. Fokus utama dari praktikum ini adalah mengimplementasikan komunikasi *real-time* dua arah antara klien dan server menggunakan teknologi WebSocket dan pustaka Socket.io dalam lingkungan Node.js.

| Keterangan | Informasi |
| :---- | :---- |
| **Mata Kuliah** | Pemrograman Berbasis Jaringan |
| **Materi** | Modul 09 \- Socket Programming |
| **Penyusun** | Muhammad Isra Al Fattah |
| **NIM** | 23343045 |
| **Direktori Kerja** | ruangobrol |

## **Konsep Kunci & Teori Dasar**

Modul kesembilan ini membahas paradigma komunikasi jaringan yang memungkinkan pertukaran data secara *real-time*:

* **Socket Programming:** Paradigma pemrograman yang memfasilitasi komunikasi antar proses melalui jaringan menggunakan soket (titik akhir komunikasi). Ini memungkinkan pertukaran data melalui protokol TCP atau UDP.  
* **WebSocket:** Protokol komunikasi yang menyediakan saluran komunikasi dua arah (*full-duplex*) melalui koneksi TCP tunggal yang persisten. Berbeda dengan HTTP yang bersifat *stateless* (memerlukan permintaan baru untuk setiap respons), WebSocket meminimalkan *overhead* dan latensi, menjadikannya ideal untuk aplikasi *real-time*.  
* **Socket.io:** Pustaka JavaScript populer untuk aplikasi web *real-time*. Socket.io bekerja di atas protokol WebSocket namun menyediakan fitur tambahan seperti *fallback* ke HTTP long-polling (jika WebSocket tidak didukung), rekoneksi otomatis, *broadcasting*, dan konsep "Rooms" (ruang) untuk pemisahan kanal komunikasi.  
* **Event-Based Communication:** Model komunikasi di mana pengiriman dan penerimaan data dipicu oleh peristiwa (*events*) tertentu (misalnya: 'pesan', 'join', 'disconnect') yang didengarkan (*listened*) dan dipancarkan (*emitted*) oleh kedua belah pihak.

## **Eksperimen dan Hasil**

Serangkaian langkah implementasi dilakukan dalam direktori proyek ruangobrol untuk membangun aplikasi obrolan (*chat app*) fungsional.

### **1\. Inisiasi Proyek dan Struktur Direktori**

Proyek diinisialisasi dan struktur direktori diatur untuk memisahkan logika sisi server (src) dan aset sisi klien (public). Dependensi utama diinstal, termasuk express (server web), socket.io (komunikasi real-time), dan bad-words (filter kata kasar).

### **2\. Implementasi Server (Backend)**

File src/index.js dikembangkan sebagai pusat logika server:

* Server HTTP dibuat menggunakan modul http dan express.  
* Instance socket.io diinisialisasi dan dipasang ke server HTTP.  
* *Event listener* io.on('connection', ...) dibuat untuk menangani setiap koneksi klien baru.  
* Logika penanganan *event* kustom diimplementasikan:  
  * socket.on('join'): Menangani pengguna yang masuk ke "Room" tertentu menggunakan socket.join(). Pesan selamat datang dikirim ke pengguna (socket.emit) dan notifikasi disiarkan ke pengguna lain di ruangan yang sama (socket.broadcast.to).  
  * socket.on('kirimPesan'): Menerima pesan dari klien, memvalidasi konten (filter kata kasar), dan meneruskannya ke seluruh anggota ruangan menggunakan io.to().emit().  
  * socket.on('kirimLokasi'): Menerima koordinat GPS dan meneruskannya sebagai tautan Google Maps.  
  * socket.on('disconnect'): Menangani pemutusan koneksi dan memberi tahu anggota ruangan lainnya.

### **3\. Manajemen Utilitas (Utils)**

Fungsi pendukung dipisahkan ke dalam modul utils untuk menjaga kebersihan kode:

* users.js: Mengelola *state* pengguna dalam memori (array), mencakup fungsi tambahPengguna, hapusPengguna, ambilPengguna, dan ambilPenggunaDariRoom. Validasi dilakukan untuk memastikan nama pengguna dan ruangan unik serta valid.  
* messages.js: Menstandarisasi format objek pesan yang dikirim, membungkus teks pesan dengan informasi pengirim dan *timestamp*.

### **4\. Implementasi Klien (Frontend)**

Antarmuka pengguna dan logika sisi klien dikembangkan:

* **UI (index.html & chat.html):** Halaman login untuk memasukkan nama dan ruangan, serta halaman utama obrolan yang berisi daftar pesan, *sidebar* daftar pengguna, dan formulir input.  
* **Logika Klien (js/chat.js):**  
  * Menginisialisasi koneksi ke server menggunakan io().  
  * Mengambil parameter kueri (username, room) menggunakan pustaka Qs.  
  * Mendengarkan *event* dari server (pesan, locationMessage, roomData) dan merender tampilan menggunakan pustaka templating Mustache.  
  * Mengirim data ke server saat formulir dikirim atau tombol lokasi ditekan.  
  * Fitur *autoscroll* diimplementasikan untuk pengalaman pengguna yang lebih baik.

### **5\. Pustaka Pendukung Sisi Klien**

Aplikasi memanfaatkan beberapa pustaka eksternal di sisi klien untuk fungsionalitas spesifik:

* **Mustache.js:** Untuk me-*render* template pesan dan sidebar secara dinamis.  
* **Moment.js:** Untuk memformat waktu (*timestamp*) menjadi format yang mudah dibaca (cth: "14:30").  
* **Qs:** Untuk mem-parsing *query string* dari URL guna mendapatkan data sesi pengguna.

## **Kesimpulan Praktikum**

Praktikum kesembilan ini berhasil mendemonstrasikan pembuatan aplikasi komunikasi *real-time*. Poin-poin kesimpulan adalah sebagai berikut:

* Aplikasi obrolan *real-time* berhasil dibangun menggunakan Node.js dan Socket.io, membuktikan efisiensi komunikasi berbasis *event* dibandingkan HTTP request tradisional.  
* Konsep "Rooms" pada Socket.io berhasil diimplementasikan untuk memisahkan percakapan antar kelompok pengguna.  
* Integrasi fitur geolokasi browser dengan Socket.io memungkinkan pembagian lokasi secara *real-time*.  
* Pemisahan logika manajemen *state* (users) dan format data (messages) meningkatkan struktur dan keterbacaan kode.

## **Tugas**

### **1\. Perbedaan socket.on di index.js (Server) dan chat.js (Klien)**

* Di src/index.js (Server):  
  socket.on di sini digunakan untuk mendengarkan event yang dikirim dari klien ke server. Objek socket dalam callback io.on('connection', (socket) \=\> { ... }) merepresentasikan koneksi spesifik ke satu klien tertentu.  
  * Contoh: socket.on('kirimPesan', ...) di server menunggu pesan yang dikirim oleh klien.  
* Di public/js/chat.js (Klien):  
  socket.on di sini digunakan untuk mendengarkan event yang dikirim dari server ke klien tersebut. Objek socket di sini merepresentasikan koneksi klien tersebut ke server.  
  * Contoh: socket.on('pesan', ...) di klien menunggu pesan yang disiarkan oleh server untuk ditampilkan di layar.

### **2\. Investigasi Console Browser**

Saat melakukan proses chat, *console* browser menampilkan output karena adanya baris kode console.log(message) di dalam *event listener* socket.on('pesan', ...) pada file chat.js.

* **Output:** Objek yang berisi properti username, text (isi pesan), dan createdAt (waktu).  
* **Kaitan Kode:**  
  // public/js/chat.js  
  socket.on('pesan', (message) \=\> {  
      console.log(message) // Baris ini mencetak objek pesan dari server ke console  
      // ... logika rendering ...  
  })

  Hal ini membuktikan bahwa data yang dikirim server berhasil diterima klien dalam bentuk objek terstruktur sebelum dirender ke HTML.

### **3\. Fungsi Library Mustache, Moment, dan Qs**

* **Mustache.js:** Digunakan sebagai *template engine* untuk merender tampilan HTML secara dinamis. Kode Mustache.render(messageTemplate, { ... }) di chat.js mengambil template HTML (dari \<script id="message-template"\>), menggabungkannya dengan data pesan, dan menghasilkan string HTML final untuk disisipkan ke DOM.  
* **Moment.js:** Digunakan untuk memformat waktu. Data createdAt dari server berupa *timestamp* (milidetik). Kode moment(message.createdAt).format('H:mm') mengubahnya menjadi format jam yang mudah dibaca (misal: 14:30).  
* **Qs (Query String):** Digunakan untuk membaca data dari URL. Saat pengguna login dari index.html, data dikirim via URL (misal: chat.html?username=Randi\&room=unp). Kode Qs.parse(location.search, ...) di chat.js mengambil nilai username dan room tersebut agar aplikasi tahu siapa yang sedang login.

### **4\. Penjelasan Komentar Elements, Templates, dan Options di chat.js**

* **// Elements**: Bagian ini menyeleksi elemen-elemen DOM (HTML) menggunakan document.querySelector (seperti form, input, tombol, area pesan) dan menyimpannya dalam variabel (biasanya diawali $). Ini memudahkan manipulasi elemen tersebut (misal: menonaktifkan tombol saat mengirim) tanpa perlu menyeleksi ulang berulang kali.  
* **// Templates**: Bagian ini mengambil isi HTML mentah (innerHTML) dari elemen \<script type="text/html"\> di chat.html. Template ini digunakan oleh Mustache untuk merender pesan masuk.  
* **// Options**: Bagian ini menggunakan pustaka Qs untuk mem-parsing *query string* dari URL browser (location.search) guna mendapatkan konfigurasi awal sesi pengguna, yaitu username dan room yang mereka masukkan saat login.

### **5\. Fungsi messages.js dan users.js**

* **messages.js**: Berfungsi sebagai *helper* untuk menstandarisasi format data pesan. Fungsi generateMessage menerima teks dan username, lalu mengembalikan objek { username, text, createdAt }. Ini memastikan setiap pesan yang dikirim server ke klien (di index.js) selalu memiliki struktur waktu dan format yang konsisten.  
* **users.js**: Berfungsi sebagai pengelola data pengguna (*in-memory database* sederhana). File ini menyimpan array users dan menyediakan fungsi untuk menambah (tambahPengguna), menghapus (hapusPengguna), dan mencari data pengguna. index.js mengimpor fungsi-fungsi ini untuk melacak siapa saja yang ada di dalam suatu *Room* berdasarkan socket.id mereka.

### **6\. Cara Aplikasi Mengirimkan Lokasi**

1. **Klien (chat.js):** Menggunakan API browser navigator.geolocation.getCurrentPosition untuk mendapatkan koordinat (latitude, longitude).  
2. **Klien:** Mengirim event socket.emit('kirimLokasi', { latitude: ..., longitude: ... }) ke server.  
3. **Server (index.js):** Menerima event tersebut, lalu membuat pesan tautan Google Maps menggunakan format https://www.google.com/maps?q=${lat},${long}.  
4. **Server:** Mengirim balik event io.to(room).emit('locationMessage', ...) yang berisi tautan tersebut ke semua klien di ruangan.  
5. **Klien:** Menerima event locationMessage dan me-render tautan tersebut menjadi tag \<a\> yang bisa diklik menggunakan template Mustache khusus lokasi.

### **7\. npm run dev vs npm run start vs node**

* **npm run dev**: Biasanya dikonfigurasi dalam package.json untuk menjalankan nodemon. Nodemon memantau perubahan file dan me-restart server secara otomatis. Ini sangat berguna saat pengembangan (development) agar tidak perlu restart manual setiap ubah kode.  
* **node index.js**: Menjalankan aplikasi secara standar. Jika ada perubahan kode, server harus dimatikan dan dinyalakan ulang manual agar perubahan terdeteksi.  
* **npm run start**: Biasanya dikonfigurasi untuk menjalankan node src/index.js. Ini adalah perintah standar untuk lingkungan produksi (*production*) di mana fitur *auto-restart* (seperti nodemon) tidak diperlukan demi stabilitas dan performa.

### **8\. Fungsi Socket Lain Selain socket.on**

Selain socket.on (untuk mendengarkan event), aplikasi ini menggunakan:

* **socket.emit('namaEvent', data)**: Mengirim event dari satu sisi ke sisi lain (bisa dari klien ke server, atau server ke klien spesifik).  
* **io.emit(...)**: (Meskipun dalam kode praktikum lebih sering menggunakan variasi io.to), fungsi dasar ini mengirim pesan ke **seluruh** klien yang terhubung.  
* **socket.broadcast.emit(...)**: Mengirim pesan ke semua klien **kecuali** pengirim. Digunakan untuk notifikasi "User A telah bergabung".  
* **socket.join('namaRoom')**: Memasukkan koneksi socket klien ke dalam "ruangan" virtual tertentu.  
* **io.to('namaRoom').emit(...)**: Mengirim pesan hanya kepada klien yang berada di dalam ruangan spesifik tersebut.

### **9\. Penjelasan Real-time Bidirectional Event-based Communication**

* **Real-time:** Komunikasi terjadi secara instan. Saat socket.emit dipanggil di satu sisi, sisi lain menerimanya hampir seketika tanpa perlu me-refresh halaman (seperti pada HTTP tradisional). Dalam aplikasi ini, chat muncul detik itu juga saat tombol kirim ditekan.  
* **Bidirectional (Dua Arah):** Server dan Klien setara dalam kemampuan memulai komunikasi. Klien bisa mengirim pesan ke server (kirimPesan), dan Server bisa mengirim pesan ke klien (pesan) kapan saja, tidak seperti HTTP di mana server hanya merespons jika ditanya klien.  
* **Event-based:** Komunikasi tidak sekadar mengirim aliran data mentah, tapi dibungkus dalam "Event" bernama.  
  * Contoh kode: socket.emit('kirimLokasi', ...)  
  * Aplikasi membedakan data berdasarkan nama eventnya. Data lokasi ditangani oleh *listener* 'kirimLokasi', sedangkan pesan teks ditangani oleh *listener* 'kirimPesan'. Ini membuat logika aplikasi terstruktur rapi berdasarkan jenis aksi yang terjadi.