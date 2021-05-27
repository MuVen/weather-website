const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define paths for express confi
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebard engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

//route handlers
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Praveen Munukutla'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Praveen Munukutla'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Praveen Munukutla'
    })
})

app.get('/weather', (req, res)=>{
    //console.log('Query Options '+req.query)
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error !== undefined){
            return res.send({
                error: 'Unable to find location. Try another Search'
            })
        }

        forecast({latitude, longitude}, (error, forecastData)=>{
            if(error){
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Praveen Munukutla',
        errorMessage: 'Help article not found.'
    })
})

//everything except listed above
app.get('*', (req, res)=>{
     res.render('404', {
         title: '404',
         name: 'Praveen Munukutla',
         errorMessage: 'Page not found.'
     })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})