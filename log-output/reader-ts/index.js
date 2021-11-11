const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')

const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')

const router = new Router()

const bodyparser = require('koa-bodyparser')

app.use(serve('/usr/src/app/files'))
app.use(bodyparser())
app.use(views('./templates', { map: { html: 'nunjucks' }}))

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePath_pings = path.join(directory, 'pings.txt')

const getFile = async ( filePath ) => new Promise(res => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    res(buffer)
  })
})

const todos = ['TODO 1','TODO 2']

router.get('/', async (ctx) => {
  return ctx.render('./index', {
    logs: await getFile(filePath),
    pings: await getFile(filePath_pings),
    todos: todos
  })
})

router.post('/', async (ctx) => {
  const { todo } = ctx.request.body

  if (todo.length > 140) {
    console.log('Length too long!')
    ctx.redirect('/')
  }
  ctx.redirect('/')
})

const PORT = process.env.PORT || 3000

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})