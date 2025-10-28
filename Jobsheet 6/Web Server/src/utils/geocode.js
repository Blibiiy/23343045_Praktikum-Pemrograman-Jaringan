const request = require('postman-request')

const geocode = (address, callback) => {
  const url =
    'http://api.positionstack.com/v1/forward?access_key=a91bc896c7552ff11a0d7495081593c4&query=' +
    encodeURIComponent(address)

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Tidak dapat terkoneksi ke layanan geocode.', undefined)
    } else if (!response.body || !response.body.data || response.body.data.length === 0) {
      console.log('Respon tidak sesuai ekspektasi:', response.body)
      callback('Tidak dapat menemukan lokasi. Coba alamat lain.', undefined)
    } else {
      const data = response.body.data
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].label
      })
    }
  })
}

module.exports = geocode
