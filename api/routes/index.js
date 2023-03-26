const express = require('express')
const Router = express.Router()
const tutorialRoute = require('./tutorial.routes')

Router.use('/tutorials', tutorialRoute)

// Router.use('/health-check', (req, res) => {
//   return res.json({ message: 'Ok' })
// })

module.exports = Router
