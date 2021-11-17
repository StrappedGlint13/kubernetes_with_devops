const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()

const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')

const router = new Router()

const bodyparser = require('koa-bodyparser')

app.use(serve('/usr/src/app/files'))
app.use(bodyparser())
app.use(views('./templates', { map: { html: 'nunjucks' }}))

let counter = 0

router.get('/pingpong', async (ctx) => {
  counter += 1
  return ctx.render('./index', {
    counter: counter
  })

})

router.get('/a', async (ctx) => {
  ctx.body = counter
})

const PORT = process.env.PORT

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})