const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const app = express()

const build = path.join(__dirname, 'build')
const index = path.join(__dirname, 'build', 'index.html')
const toolbox = path.join(__dirname, 'node_modules', 'sw-toolbox', 'sw-toolbox.js')


if (!process.env.NO_LOGGING) {
  app.use(morgan('tiny'))
}

app.use(compression())

app.get('/sw-toolbox.js', (req, res) => {
  res.sendFile(toolbox)
})

app.get('/sw-toolbox.js.map', (req, res) => {
  res.sendFile(toolbox + '.map')
})

app.use(express.static(build))

app.get('/*', (req, res) => {
  res.sendFile(index)
})

app.listen(3000)
