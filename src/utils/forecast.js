const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url= 'https://api.darksky.net/forecast/7c20b8eb431af956eec26ba41810306b/'+ latitude + ','+ longitude
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
