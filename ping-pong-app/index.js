const Koa = require('koa')
const cors = require('@koa/cors');
const app = new Koa()
require('dotenv').config()
app.use(cors());
const Router = require('koa-router')
const views = require('koa-views')

const router = new Router()


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