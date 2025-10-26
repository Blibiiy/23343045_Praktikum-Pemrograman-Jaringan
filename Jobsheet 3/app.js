const request = require('postman-request')
const url = 
'http://api.weatherstack.com/current?access_key=a3fa6154206d89ab7641a8f85a5979b7&query=-0.8969796661164124,%20100.35103330294889'
request({ url: url}, (error, response) => {
      // console.log(response)
      const data = JSON.parse(response.body)
      // console.log(data)
      console.log(data.current)
      console.log(data.current.temperature)
})