const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoieXViaWtoYWRrYSIsImEiOiJja2FjMTJpdWQwMHMzMnhxbzJ2eHJ5bmhyIn0.GIDgrGL7DAuXNkcpw6bE_Q'
    request({url,json: true}, (error, { body } = {}) => {
        if(error) {
            callback('unable to connect to mapbox service', undefined)
        } else if (body.features.length === 0) {
            callback('No matching results found. Try again!', undefined)
        } else {
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
        }
    })
}

module.exports = geoCode