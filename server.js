const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(routes)

mongoose.connect('mongodb://localhost/my-blog')
.then((res) => {
    console.log('connect')
}).catch((err) => {
    console.log(err)
});

app.listen(3000)