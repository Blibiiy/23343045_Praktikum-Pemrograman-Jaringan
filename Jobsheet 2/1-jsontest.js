const fs = require('fs')

// const buku = {
//       judul: 'Praktikum Pemograman Jaringan',
//       penulis: 'Muhammad Isra Al Fattah'
// }

// const booksJSON = JSON.stringify(buku)
// fs.writeFileSync('1-buku.json', booksJSON)

const dataBuffer = fs.readFileSync('1-buku.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.judul)