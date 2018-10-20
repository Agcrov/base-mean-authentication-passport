const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    content: { type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
},{timestamps:true});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.addComment = function (comment, callback) {
    comment.save(callback);
};

module.exports.getCommentById = function (id,callback) {
    Comment.findById(id,(err, comment)=>{
        if (err) throw err;
        comment.populate('author',callback);
    });
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
        comment.populate('author').populate('replies', (err, comment) =>{
            if (err) throw err;
            comment.populate('replies.author', callback);
        });
    });
};
module.exports.editComment = function (editedComment, callback) {
    const query = { _id: editedComment._id };
    Comment.updateOne(query, { content: editedComment.content}, callback);
};
module.exports.deleteComment = function (id, callback) {
    Comment.deleteOne({ _id: id }, callback);
};
