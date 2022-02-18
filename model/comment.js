const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	user: {
		type: String,
	},
	comment: {
		type: String,
		required: true,
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
	},
},{timestamps:true});

module.exports = mongoose.model('comment', commentSchema);
