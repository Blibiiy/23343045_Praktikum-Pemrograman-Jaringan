const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const namaDatabase = 'test';

async function main() {
      try {
            await client.connect();
            console.log('Koneksi Berhasil ke MongoDB');
            const db = client.db(namaDatabase);

            // mencari satu dokumen dalam koleksi 'pengguna' berdasarkan nama 'isra'.
            const byNama = await db.collection('pengguna').findOne({ nama: 'Isra' });

            // mencari satu dokumen dalam koleksi 'pengguna' berdasarkan ID objek tertentu.
            const byObjectID = await db.collection('pengguna').findOne({ _id: new ObjectId("6908047a67afb859bedc2828") });

            // Mencari beberapa dokumen dalam koleksi 'pengguna' dengan kriteria usia 28 dan mengubahnya menjadi array.
            const toArray = await db.collection('pengguna').find({ umur: 21 }).toArray();

            // Menggunakan if statement dengan kondisi yang slah.
            if (byNama && byObjectID && toArray) {
                  // menampilkan hasil pencarian berdasarkan nama, ID objek, dan kriteria usia.
                  console.log('Data pengguna ditemukan (berdasarkan nama):', byNama);
                  console.log('Data pengguna ditemukan (berdasarkan ID objek):', byObjectID);
                  console.log('Data Pengguna ditemukan (dalam format Array):', toArray);
            } else{
                  // Menampilkan pesan bahwa data pengguna tidak ditemukan.
                  console.log('Data pengguna tidak ditemukan');
            }
      } catch (err) {
            console.error(err);
      } finally {
            await client.close();
      }
}


// memanggil fungsi 'main' dan menangani kesalahan (jika ada) dengan mencetak pesak kesalahan ke konsol.

main().catch(console.error);