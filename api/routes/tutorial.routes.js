const tutorials = require('../controllers/tutorial.controller.js')

let tutorialRouter = require('express').Router()

// Create a new Tutorial
tutorialRouter.post('/', tutorials.create)

// Retrieve all Tutorials
tutorialRouter.get('/', tutorials.findAll)

// Retrieve all published Tutorials
tutorialRouter.get('/published', tutorials.findAllPublished)

// Retrieve a single Tutorial with id
tutorialRouter.get('/:id', tutorials.findOne)

// Update a Tutorial with id
tutorialRouter.put('/:id', tutorials.update)

// Delete a Tutorial with id
tutorialRouter.delete('/:id', tutorials.delete)

// Delete all Tutorials
tutorialRouter.delete('/', tutorials.deleteAll)

module.exports = tutorialRouter
