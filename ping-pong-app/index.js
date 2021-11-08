const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()

let counter = 0

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
  counter += 1
  fs.appendFile("./counter.txt", counter.toString(), (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(counter)
  }); 

  ctx.body = `Pong: ${counter}`
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})