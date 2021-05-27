const log = console.log
const request = require('request')

const forecast = (coords, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=22a4f4a272d5658c7b7be4f74ed1c5e2&query='+coords.latitude+','+coords.longitude

     //log(url)

     request({url, json: true}, (error, {body}) => {
         if(error){
             callback('Cannot reach weather stack', undefined)
         }else if(body.error){
             callback('Unable to find location', undefined)
         }else {
            // const forecastData = {
            //     description: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike
            // }
            
            callback(undefined, body.current.weather_descriptions[0]+' Its current '+ body.current.temperature+' degress out. It feels like '+body.current.feelslike)
         }
     })

}

module.exports = forecast