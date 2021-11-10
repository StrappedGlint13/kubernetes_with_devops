const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePath_pings = path.join(directory, 'pings.txt')

const getFile = async () => new Promise(res => {
  fs.readFile(filePath_pings, 'utf8' , (err, data) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    res(data)
  })
})

const getTimeStamp = async () => {
  const randomHash = Math.random().toString(36).substr(2, 15)
  const time = Date(Date.now())
  const timestamp  = time + randomHash

  const data = await getFile()

  const stmts = `${timestamp} \nping / pong: ${data}`

  fs.writeFile(filePath, stmts , 'utf8', (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(stmts)
  })

  setTimeout(getTimeStamp, 5000)
}

getTimeStamp()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})