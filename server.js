const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost/my-blog')
.then((res) => {
    console.log('connect')
}).catch((err) => {
    console.log(err)
});

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(routes)



app.listen(4000)