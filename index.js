const path = require('path')
const express = require('express')
const compression = require('compression')
const app = express()

const build = path.join(__dirname, 'build')
const index = path.join(__dirname, 'build', 'index.html')

app.use(compression())
app.use(express.static(build))

app.get('/*', (req, res) => {
  res.sendFile(index)
})

app.listen(3000)
