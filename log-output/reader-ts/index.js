const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')

const getFile = async () => new Promise(res => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    res(buffer)
  })
})

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
  ctx.body = await getFile()
  ctx.set('Content-type', 'text/plain; charset=utf-8');
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})