const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const namaDatabase = 'test';

async function main() {
      try{
            await client.connect();
            console.log('Berhasil terhubung ke MongoDB database server');
            const db = client.db(namaDatabase);

            // menghapus data dengan perintah deletMany
            // db.collection('pengguna').deleteMany({
            //       umur: 23
            // }).then((result) => {
            //       console.log(result);
            // }).catch((error) => {
            //       console.error(error);
            // })

            // menghapus data dengan perintah deleteOne
            db.collection('pengguna').deleteOne({
                  _id: new ObjectId('690d5634c1d7be6d7ed8b6d8')
            }).then((result) => {
                  console.log(result);
            }).catch((error) => {
                  console.error(error);
            }).finally(() => {
                  client.close();
            });
      } catch(error) {
            console.error(error);
      }
}

main();