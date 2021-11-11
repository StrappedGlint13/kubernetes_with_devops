const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')

const views = require('koa-views')

const Router = require('koa-router')
const router = new Router()

const serve = require('koa-static')
app.use(serve('/usr/src/app/files'))

app.use(views('./templates', { map: { html: 'nunjucks' }}))

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePath_pings = path.join(directory, 'pings.txt')
const filePath_image = path.join(directory, 'image.jpg')

const getFile = async ( filePath ) => new Promise(res => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    res(buffer)
  })
})

router.get('/', async (ctx, next) => {
  return ctx.render('./index', {
    logs: await getFile(filePath),
    pings: await getFile(filePath_pings),
  })
})

const PORT = process.env.PORT || 3000

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})