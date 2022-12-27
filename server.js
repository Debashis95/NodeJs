const express = require('express')
require('dotenv').config()
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', 'views')

const appRoute = require('./routes/app.routes')
app.use(appRoute)
mongoose.set('strictQuery', false)
const port = process.env.PORT || 1995
const dbDriver =
  'mongodb+srv://debashis:R7KmV58sN3smMeN@cluster0.eihs8.mongodb.net/CrudApp'

mongoose
  .connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log('DB is Connected')
      console.log(`Server is running at @ http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.log('DB is not connected')
  })
