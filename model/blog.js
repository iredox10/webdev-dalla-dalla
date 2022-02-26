const mongoose = require('mongoose');   
const slugify = require('slugify');
const marked = require('marked');
const createDompurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDompurify(new JSDOM().window)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    markdown: {
        type:String,
        required: true
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    tag: {
        type:String,
        required: true,
        uppercase: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type:String,
        required:true
    }
},{timestamps:true})

blogSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true,strict:true})
    }
    if (this.markdown) {
			this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
		}
        next()
})

module.exports = mongoose.model('Blog',blogSchema)
