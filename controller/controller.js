const Blog = require('../model/blog')
const Comment = require('../model/comment')

exports.get_home = async (req, res) => {
    let blogs = await Blog.find()
    res.render('home', { title: 'iredox - blog', blogs })
}

exports.get_admin = (req, res) => {
    res.render('admin', {title: 'admin - page'})
}

exports.get_add_blog = (req,res) => {
    res.render('admin-add-blog',{title:'add-blog'})
}

exports.post_blog = async (req, res) => {
    try {
        let newPost = new Blog(req.body)
        let post = await newPost.save()
        res.redirect('/view-blogs')
    } catch (err) {
        console.log(err)
    }
}

exports.get_blog = async (req, res) => {
    let id = req.params.id
    let blog = await Blog.findById(id)
    res.render('blog',{title:blog.tiltle, blog})
}

exports.get_view_blogs = async (req, res) => {
    let blogs = await Blog.find()
    res.render('admin-view-blogs',{blogs,title:'blogs'})
}

exports.post_comment = async (req, res) => {
    
}