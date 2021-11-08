const fs = require('fs');
const Koa = require('koa')
const app = new Koa()
require('dotenv').config()

const getTimeStamp = async () => {
  const randomHash = Math.random().toString(36).substr(2, 6)
  const time = Date(Date.now())
  const timestamp  = time + randomHash

  fs.appendFile("./logs.txt", timestamp, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(timestamp)
}); 

  setTimeout(getTimeStamp, 5000)
  return timestamp
}

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
  const timestamp = await getTimeStamp()
  ctx.body = `${timestamp}`
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})