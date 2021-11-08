const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello Kubernetes</h1>')
})
require('dotenv').config()
console.log('lol')
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})