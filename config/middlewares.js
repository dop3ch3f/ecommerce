const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
router.use(helmet())
router.use(morgan('combined'))
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())

module.exports = router
