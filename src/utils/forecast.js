const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d55d272f9374c94f5a4437239cb000e&query=' +latitude+ ',' +longitude
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect to weathermap service', undefined)
        } else if(body.error) {
            callback('coordinates error', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' +body.current.temperature + ' degrees out. '+ 'There is a ' +body.current.precip + '% chance of rain')
        }
    })

}

module.exports = forecast