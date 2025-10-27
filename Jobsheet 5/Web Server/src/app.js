const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views',direktoriViews)
hbs.registerPartials(direktoriPartials)

app.use(express.static(direktoriPublic));

//ini halaman/page utama
app.get('', (req, res) => {
      res.render('index', {
            judul: 'Aplikasi Cek Cuaca',
            nama: 'isra'
      })
})

//ini halaman bantuan/fazq (frequently asked questions)  
app.get('/bantuan', (req,res) => {
      res.render('bantuan', {
            judul: 'bantuan',
            nama: 'Muhammad Isra Al Fattah',
            teksBantuan: 'ini adalah teks bantuan'
      })
})

app.get('/infoCuaca', (req,res) => {
      if (!req.query.address) {
            return res.send({
                  error: 'Kamu harus memasukkan lokasi yang ingin dicari'
            })
      }

      res.send({
            prediksiCuaca: 'Cuaca Sedang Hujan',
            lokasi: 'Padang',
            address: req.query.address
      })
})

app.get('/tentang', (req,res) => {
      res.render('tentang', {
            judul: 'Tentang Saya',
            nama: 'Muhammad Isra Al Fattah'
      })
})


app.get('/bantuan/:subpath', (req,res) => {
      res.render('404', {
            judul: '404',
            nama: 'Muhammad Isra Al Fattah',
            pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
      })
})

app.use((req,res) => {
      res.render('404', {
            judul: '404',
            nama: 'Muhammad Isra Al Fattah',
            pesanKesalahan: 'Halaman tidak ditemukan.'
      })
})

app.listen(4000, () => {
      console.log('Server berjalan pada port 4000')
})