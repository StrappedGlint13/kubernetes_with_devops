const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const path = require('path')

let counter = 0

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pings.txt')

const write = ( counter ) => {
  fs.writeFileSync(filePath, ('Ping / Pong: ', counter.toString()), (err) => {
    if(err) {
        return console.log(err);
    }
  }); 
}

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
  counter += 1
  
  write(counter)

  ctx.body = `Pong: ${counter}`
});



const PORT = process.env.PORT

app.listen(PORT, () => {
  write(0)
  console.log(`Server running on port ${PORT}`)
})