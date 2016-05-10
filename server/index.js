'use strict'

var path = require('path')

var express = require('express')

var app = express()

// Set up Pug (Jade) for use in view templates
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Set up root route for serving website
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Tic Tac Toe: React.js + Redux'
  })
})

// Simple file serving from `public` directory
app.use(express.static(path.join(__dirname, '../public')))

// Simple 404 handler catches all other routes
app.use(function (req, res) {
  res.status(404).send('Resource not found')
})

// Simple error handler
app.use(function (err, req, res) {
  console.error(err.stack)

  res.status(500).send('Ruh roh! We\'ve hit a snag...')
})

app.listen(3001, function () {
  console.log('Web service is listening on port 3001')
})
