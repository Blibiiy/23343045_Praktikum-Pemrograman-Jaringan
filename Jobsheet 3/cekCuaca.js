const request = require('postman-request')
const urlCuaca = 
'http://api.weatherstack.com/current?access_key=a3fa6154206d89ab7641a8f85a5979b7&query=-0.8969796661164124,%20100.35103330294889'
request({ url: urlCuaca, json: true}, (error, response) => {
      console.log(`saat ini suhu diluar mencapai ${response.body.current.temperature}
      derajat celcius. kemungkinan terjadi hujan adalah
      ${response.body.current.precip} %`)
      console.log(`deskripsi dari cuaca adalah ${response.body.current.
      weather_descriptions[0]}`)
})