require('dotenv').config()

const express = require('express')
const cors = require('cors')

let apiRoutes = require('./api/routes')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./api/models')

if (process.env.STAGE !== 'prod') {
  db.sequelize
    .sync()
    .then(() => {
      console.log('Synced db.')
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message)
    })
}

// https://www.stackhawk.com/blog/nodejs-content-security-policy-guide-what-it-is-and-how-to-enable-it/
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  // res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'")
  res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'")

  // res.setHeader(
  //   'Content-Security-Policy-Report-Only',
  //   "default-src 'self'; script-src 'self' https://code.jquery.com/jquery-3.5.1.min.js https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone-with-data.js https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css; font-src 'self' https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.woff https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf; img-src 'self'; frame-src 'self'"
  // )

  // common domain
  // res.setHeader(
  //   'Content-Security-Policy-Report-Only',
  //   "default-src 'self'; script-src 'self' https://code.jquery.com https://cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net; style-src 'self' https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self'; frame-src 'self'"
  // )

  // res.set({
  //    'content-type': 'application/json',
  //    'content-length': '100',
  //    'warning': "with content type charset encoding will be added by default"
  // });

  next()
})

// simple route
app.get('/health-check', (req, res) => {
  res.json({ message: 'Ok' })
})

app.use('/api', apiRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
