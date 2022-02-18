const mongoose = require('mongoose')
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost/my-blog')
.then((res) => {
    console.log('connect')
}).catch((err) => {
    console.log(err)
});

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(3000)