const express = require('express')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')

// connect to Mongodb
const DbUri = 'mongodb+srv://swag19:Swagat123@cluster0.gufebur.mongodb.net/swagblog?retryWrites=true&w=majority'
mongoose.connect(DbUri, { useNewUrlParser: true, useUnifiedTopology: true }) // to remove deprication warning.
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

//  static files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

// All -> /blogs <- are forwarded to other file
app.use('/blogs', blogRoutes)

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// Error page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
