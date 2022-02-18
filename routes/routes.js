const express = require('express');
const route = express.Router()
const controller = require('../controller/controller')

route.get('/', controller.get_home)

route.get('/blog/:id', controller.get_blog)
route.get('/admin', controller.get_admin)

route.get('/add-blog', controller.get_add_blog)
route.post('/add-blog', controller.post_blog)

route.get('/edit-blog/:id', controller.get_edit_blog)
route.patch('/edit-blog/:id', controller.edit_blog)

route.delete('/delete-blog/:id',controller.delete_blog)

route.get('/view-blogs', controller.get_view_blogs)

route.get('/about', controller.get_about)

// route.patch('/comment/:id',controller.post_comment)

module.exports = route