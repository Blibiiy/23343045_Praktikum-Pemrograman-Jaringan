const { default: isIBAN } = require("validator/lib/isIBAN")


const ambilCatatan = function() {
      return 'Ini Catatan Muhammad Isra Al Fattah...'
}

const tambahCatatan = function (judul, isi) {
      const catatan = muatCatatan()
      const catatanGanda = catatan.filter(function (note) {
            return note.title === judul
      })

      if (catatanGanda.length === 0) {
            catatan.push({
                  judul: judul,
                  isi: isI
            })
            simpanCatatan(catatan)
            console.log('Catatan baru ditambahkan!')
      } else {
            console.log('Judul catatan telah dipakai')
      }
}

const hapusCatatan = function(judul) {
      const catatan = muatCatatan()
      const catatanUntukDisimpan = catatan.filter(function (note){
            return note.judul !== judul
      })

      if (catatan.length > catatanUntukDisimpan.length) {
            console.log(chalk.green.inverse('Catatan dihapus!'))
            simpanCatatan(catatanUntukDisimpan)
      } else{
            console.log(chalk.red.inverse('Tidak ada catatan yang dihapus!'))
      }
}

const simpanCatatan = function(catatan) {
      const dataJSON = JSON.stringify(catatan)
      fs.writeFileSync('catatan.json', dataJSON)
}

const muatCatatan = function() {
      try {
            const dataBuffer = fs.readFileSync('catatan.json')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
      } catch (e) {
            return []
      }
}

module.exports = {
      ambilCatatan: ambilCatatan,
      tambahCatatan: tambahCatatan
}