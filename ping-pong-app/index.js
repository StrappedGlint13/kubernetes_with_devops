const { Pool } = require("pg");
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

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD

const credentials = {
  user: "postgres",
  host: "postgres-service",
  database: "postgres",
  password: POSTGRES_PASSWORD,
  port: 5432,
};

const pool = new Pool(credentials)
let counter = 0


router.get('/pingpong', async (ctx) => {
  counter += 1
  pool.query(
    `INSERT INTO ppa.pongs(counter)VALUES(${counter})`,
    (err, res) => {
      console.log(err, res)
    }
  )
  return ctx.render('./index', {
    counter: counter
  })

})

router.get('/', async (ctx) => {
  ctx.status = 200
})

router.get('/a', async (ctx) => {
  ctx.body = counter
})

const PORT = process.env.PORT

app.use(router.routes())



app.listen(PORT, async () => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })
  console.log(`Server running on port ${PORT}`)
})


