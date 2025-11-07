// Mengimport modul Mongoclient dan ObjectID dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDb server yang akan digunakan untuk koneksi.
const url = 'mongodb://localhost:27017';

// Membuat instance MongoClient dengan URL koneksi yang telah didefiniskan sebelumnya.
const client = new MongoClient(url);

// Mendefinisikan nama databse yang akan digunakan.
const namaDatabase = 'test';

// Membuat instance ObjectId baru. ini digunakan untuk menghasilkan unik identifier untuk dokumen mongo db
const id = new ObjectId();

// Bagian ini mencetak informasi dari ObjectID()
console.log(id);

// mencetak representasi hexadecimal dari ObjectID ke konsol.
console.log(id.id);
// mencetak panjang (jumlah karakter) dari representasi hexadecimal ObjectID ke konsol.
console.log(id.id.length);

// Mencetak timestapm yang terkait dengan objectID ke konsol.
console.log(id.getTimestamp());

// mencetak panjang dari representasi objectid dalam bentuk string heksadesimal.
console.log(id.toHexString().length);

// bagian ini adalah fungsi utama yang berjalan secar asynchronous
async function main() {
      try {
            // Menggunakan 'await' untuk menghubungkan ke serber mongoDB.
            await client.connect();
            console.log('Koneksi Berhasil ke MongoDB');

            // memilih database dengan nama'task-manager'
            const db = client.db(namaDatabase);

            // memilih koneksi 'pengguna' di dalam database.
            const clPengguna = db.collection('pengguna');

            // memilih koleksi 'tugas' di dalam database.
            const clTugas = db.collection('tugas');

            // memasukkan dokumen ke dalam koleksi 'pengguna'.
            const insertPengguna = await clPengguna.insertOne({
                  _id: id,
                  nama: 'nek ',
                  umur: 11
            });
            console.log('Memasukkan data pengguna ke koleksi => ', insertPengguna);

            // memasukkan dokumen ke dalam koleksi 'tugas'.
            const insertTugas = await clTugas.insertMany([
                  {
                        Deskripsi: 'Membersihkan rumah',
                        StatusPenyelesaian: true
                  },
                  {
                        Deskripsi: 'Mengerjakan tugas kuliah',
                        StatusPenyelesaian: false
                  },
                  {
                        Deskripsi: 'Memberikan bimbingan',
                        StatusPenyelesaian: false
                  }
            ]);
            console.log('Memasukkan data tugas ke koleksi => ', insertTugas);

            // mengembalikan pesan sukses setelah operasi selesai.
            return 'Data selesai dimasukkan.';
      }
      catch (err) {
            // menangani kesalahan dengan mencetak pesan kesalahan ke konsol.
            console.error(err);
      }
      finally {
            // selalu menutup koneksi setelah operasi selesai.
            client.close();
      }
}

// memanggil fungsi main dan menangani hasilnya menggunakan 'then' dan 'catch'.
main().then(console.log).catch(console.error);