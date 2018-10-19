const mongoose = require('mongoose');
const config = require('../config/database');
// const Reply = require('./reply');

const CommentSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true},
    content: { type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
},{timestamps:true});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.addComment = function (comment, callback) {
    comment.save(callback);
};

module.exports.getCommentById = function (id,callback) {
    Comment.findById(id, callback);
};
module.exports.addReply = function (reply, callback) {
    var id = reply.replies_to;
    Comment.getCommentById(id, (err, comment) =>{
        if (err) throw err;
        comment.replies.push(reply);
        comment.save(callback);
    });
};
module.exports.getCommentWithReplies = function (id, callback) {
    Comment.getCommentById(id, (err, comment) => {
        if (err) throw err;
        comment.populate('replies', callback);
    });
};
