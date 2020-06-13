const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()

//define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Yubi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Yubi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helptext: 'This section is for the helpful content',
        name: 'Yubi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address required'
        })
    }
    const address = req.query.address

    geoCode(address, (error, { latitude, longitude, location } = {} ) => {
        if ( error ) {
           return res.send({ error })
        }
 
        forecast(latitude, longitude, (error, forecastdata) => {
            if( error ) {
                return res.send({ error })
            }

            res.send({
                address: address,
                latitude: latitude,
                longitude: longitude,
                location,
                forecast: forecastdata
            })
        })
    })

   
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        errormessage: 'Help article not found',
        title: 'Help error page',
        name: 'Yubi'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errormessage: 'Page not found',
        title: 'Error page',
        name: 'Yubi'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})