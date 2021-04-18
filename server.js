const express = require('express')
const app = express()
const path = require('path')

const port = 8080

// viewed at http://localhost:8080
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.use(express.static('js'))

app.listen(port)
console.log(`Server running on: http://localhost:${port}`)
