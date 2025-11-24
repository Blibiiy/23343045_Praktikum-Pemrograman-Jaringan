// Pastikan file ini tersimpan di public/js/chat.js

// Koneksi ke socket.io
const socket = io()

// Ambil elemen DOM
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')
const $formPesan = document.querySelector('#form-pesan')
const $inputPesan = $formPesan.querySelector('input[name="pesan"]')
const $buttonKirim = $formPesan.querySelector('button')
const $buttonLokasi = document.querySelector('#kirim-lokasi')

// Ambil template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#locationMessage-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Parse query string (?username=...&room=...)
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// Auto scroll (opsional)
function autoScroll() {
  const $newMessage = $messages.lastElementChild
  if (!$newMessage) return

  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

  const visibleHeight = $messages.offsetHeight
  const containerHeight = $messages.scrollHeight
  const scrollOffset = $messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight <= scrollOffset + 10) {
    $messages.scrollTop = $messages.scrollHeight
  }
}

// Terima pesan biasa
socket.on('pesan', (message) => {
  // message: { username, text, createdAt }
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,              // mapping text -> message
    createdAt: moment(message.createdAt).format('H:mm')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

// Terima pesan lokasi
socket.on('locationMessage', (locationMessage) => {
  // locationMessage: { username, url, createdAt }
  const html = Mustache.render(locationTemplate, {
    username: locationMessage.username,
    url: locationMessage.url,
    createdAt: moment(locationMessage.createdAt).format('H:mm')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

// Terima data room/sidebar
socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, { room, users })
  $sidebar.innerHTML = html
})

// Join ke room
socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/' // kembali ke halaman awal
  }
})

// Kirim pesan
$formPesan.addEventListener('submit', (e) => {
  e.preventDefault()
  $buttonKirim.setAttribute('disabled', 'disabled')

  const pesan = $inputPesan.value
  socket.emit('kirimPesan', pesan, (error) => {
    $buttonKirim.removeAttribute('disabled')
    $inputPesan.value = ''
    $inputPesan.focus()
    if (error) {
      return console.log('Error:', error)
    }
    // Pesan terkirim sukses
  })
})

// Kirim lokasi
$buttonLokasi.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation tidak didukung oleh browser ini.')
  }
  $buttonLokasi.setAttribute('disabled', 'disabled')
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('kirimLokasi', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $buttonLokasi.removeAttribute('disabled')
    })
  })
})