const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const namaDatabase = 'test';

async function main() {
      try {
            await client.connect();
            console.log('berhasil terhubung ke MongoDB database server');
            const db = client.db(namaDatabase);

            // // memperbaharui data dengan perintah updateOne
            // const updateOnePromise = db.collection('pengguna').updateOne(
            //       {_id: new ObjectId('6908047a67afb859bedc2828')},
            //       // {$set: { nama: 'isra kun' }},
            //       {$inc: { umur: 1 } }
            // )
            // updateOnePromise.then((result) => {
            //       console.log(result);
            // }).catch((error) => {
            //       console.error(error);
            // }).finally(() => {
            //       client.close();
            // });

            // memperbaharui data dengan perintah updateMany
            db.collection('tugas').updateMany(
                  { StatusPenyelesaian: false },
                  { $set: { StatusPenyelesaian: true } }
            ).then((result) => {
                  console.log(result.modifiedCount);
            }).catch((error) => {
                  console.error(error);
            }).finally(() => {
                  client.close();
            });
      } catch (err) {
            console.error(err);
      }
}

main();