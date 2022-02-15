const express = require('express');
const route = express.Router()
const controller = require('../controller/controller')

route.get('/', controller.get_home)

route.get('/blog/:id', controller.get_blog)
route.get('/admin', controller.get_admin)

route.get('/add-blog', controller.get_add_blog)
route.post('/add-blog', controller.post_blog)

route.get('/view-blogs', controller.get_view_blogs)

route.post('/comment',controller.post_comment)

module.exports = route