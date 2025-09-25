//import core module node.js
//const fs = require('fs')
//fs.writeFileSync('catatan.txt', 'Nama saya Muhammad Isra Al fattah')
//fs.appendFileSync('catatan.txt', '\nSaya tinggal di Padang')


//// import file pada node.js
// const catatan = require('./catatan.js')
// const pesan = catatan()
// console.log(pesan)

//// import npm pada node js
// const validator = require('validator')
// const ambilCatatan = require('./catatan.js')
// const pesan = ambilCatatan()
// console.log(pesan)
// console.log(validator.isURL('https://www.Isra.com'))

//// Latihan 1
// import chalk from 'chalk'
// console.log(chalk.blue('Print warna biru sukses'));
// console.log(chalk.red('Print warna merah sukses'));
// console.log(chalk.gray('Print warna abu-abu sukses'));


//// Latihan 2
// menginstall nodemon dengan peritah npm install -g nodemon
// kemudian jalankan file App.js dengan perintah nodemon App.js
// lakukan perubahan kode pad file App.js, maka perubahannya akan lgsg terlihat
// ini karena nodemon akan memantau perubahan pada file js


//// Mendapatkan input dari user
// import ambilCatatan from "./catatan.js";

// const command = process.argv[2]
// console.log(process.argv[2]);

// if (command === 'tambah') {
//     console.log('Tambah Catatan');
// } else if (command === 'hapus') {
//     console.log('Hapus Catatan');
//}

//process.argv[0] merupakan lokasi Node.js di sistem
//process.argv[1] merupakan lokasi file js yang sedang dijalankan
//process.argv[2]-dan seterusnya merupakan input dari user


//// Argumen Parsing (penguraian Argumen)
// 1. lakukan instalasi yargs dengan perintah npm install yargs
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const catatan = require('./catatan.js')

const yargsInstance = yargs(hideBin(process.argv))


yargsInstance.version('10.1.0')

// command: tambah
yargsInstance.command({
    command: 'tambah',
    describe: 'tambah sebuah catatan baru',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        catatan.tambahCatatan(argv.judul, argv.isi);
    }
})

// command: hapus
yargsInstance.command({
    command: 'hapus',
    describe: 'hapus catatan',
    handler: () => {
        catatan.hapusCatatan(argv.judul)
    }
})

// parsing
yargsInstance.parse()
