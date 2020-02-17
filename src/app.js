const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// express has handlebars in it
// index must be in a folder called views

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// below, we render a views template made with handlebar at index
// inject values into the template, accessible in handlebar template

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ken Morawski'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About this site',
        name: 'Ken Morawski'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Some helpful information will go here',
        title: 'Help',
        name: 'Ken Morawski'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No Address selected'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }) 
    })
    
    // res.send({
    //     forecast: 'cold',
    //     location: 'City',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search criteria'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/404page', (req,res) => {
    res.render('404page', {
        title: 'About this site',
        name: 'Ken Morawski'
    })
})

app.get('/404helppage', (req,res) => {
    res.render('404helppage', {
        title: 'About this site',
        name: 'Ken Morawski'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404helppage')
})

app.get('*', (req,res) => {
    res.render('404page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
