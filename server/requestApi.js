const request = require('request')
const Image = require('./models/Picture')

const dotenv = require('dotenv')
dotenv.config()


const requestApi = () => {
    return new Promise((resolve, reject) => {
        console.log('requestApi');
        let options = {
            method: 'GET',
            url: `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
        }
        request(options, (err, res, body) => {
            if (err)
                reject(err)
            else {
               resolve(body)
            }
        })
    })
}

module.exports = { requestApi };