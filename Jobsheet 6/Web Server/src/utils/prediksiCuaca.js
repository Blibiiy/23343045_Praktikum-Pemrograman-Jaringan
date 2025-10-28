const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
      const url =
      'http://api.weatherstack.com/current?access_key=a3fa6154206d89ab7641a8f85a5979b7&query='
      + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';
      request({ url: url, json: true }, (error, response) => {
            if (error) {
                  callback('Tidak dapat terkoneksi ke layanan', undefined)
            } else if (response.body.error) {
                  callback('Tidak dapat menemukan lokasi cuaca.', undefined)
            } else {
                  callback(undefined, 
                        'Info Cuaca: ' + response.body.current.weather_descriptions[0] + '. '
                        + response.body.current.temperature + ' derajat celcius. ' +
                        'Index UV adalah ' + response.body.current.uv_index + 'nm. ' + 
                        'Visibilitas ' + response.body.current.visibility + 'km.'
                  )
            }
      })
}

module.exports = forecast