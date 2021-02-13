import express from 'express'

const app = express()

app.get('/', (req, res) => {
  console.log(req)
  res.send('fuck')
})

export default app
