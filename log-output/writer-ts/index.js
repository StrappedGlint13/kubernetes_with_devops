const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')
const axios = require('axios')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePath_image = path.join(directory, 'image.jpg')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath_image, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return

  await new Promise(res => fs.mkdir(directory, (err) => res()))
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(filePath_image))
}

const getTimeStamp = async () => {
  const randomHash = Math.random().toString(36).substr(2, 15)
  const time = Date(Date.now())
  const timestamp  = time + randomHash

  const stmts = `${timestamp}`

  fs.writeFile(filePath, stmts , 'utf8', (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(stmts)
  })
  findAFile()
  setTimeout(getTimeStamp, 5000)
}

getTimeStamp()


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})