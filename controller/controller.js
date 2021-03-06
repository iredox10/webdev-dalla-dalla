const jwt = require('jsonwebtoken')
const Comment = require('../model/comment')
const Blog = require('../model/blog')
const blog = require('../model/blog')


const verifySignIN = (id) => {
    jwt.sign({id:id},'admin secre')
}

exports.get_home = async (req, res) => {
    let blogs = await Blog.find()
    res.render('home', { title: 'iredox - blog', blogs })
}

exports.get_admin = (req, res) => {
    res.cookie('admin','admin cookie',{maxAge:10000})
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
    let comments = await Blog.findById(id).populate({
        path: 'comment',
        select:'comment'
    })
    console.log(blog.slug)
    res.render('blog', { title: blog.tiltle, blog , comments})
}

exports.get_view_blogs = async (req, res) => {
    let blogs = await Blog.find()
    res.render('admin-view-blogs',{blogs,title:'blogs'})
    // res.json({blogs})
}

exports.post_comment = async (req, res) => {
    const blogId = req.params.id
    let comment = await Comment.create({
        comment: req.body.comment,
        blog: blogId
    })
    let newComment = await comment.save()
    // res.send(newComment)
    
    const blog = await Blog.findById(blogId)
    // res.send(blogId)

    blog.comment.push(newComment)
    await blog.save()

    // res.send(blog)
    res.redirect(`/blog/${blogId}`)
}

exports.get_edit_blog = async (req, res) => {
    let blog = await Blog.findById(req.params.id)
    res.render('edit-blog',{title:'edit-blog',blog})
}
exports.edit_blog = async (req, res) => {
    let blog = await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/view-blogs')
}

exports.delete_blog = async (req, res) => {
    let blog = await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/view-blogs')
}


exports.get_about = async (req, res) => {
    res.render('about', { title:'about'})
}

exports.search = async (req, res) => {
    let searchTerm = req.query.search.toUpperCase()
    let blogs = await Blog.find({ tag: searchTerm })
    res.render('searchBlog', {
        title: 'result', blogs, searchTerm
    })
}