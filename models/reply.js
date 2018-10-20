const mongoose = require('mongoose');
const Comment = require('./comment');
const config = require('../config/database');

const ReplySchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    content: { type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true}
},{timestamps:true});

const Reply = module.exports = mongoose.model('Reply', ReplySchema);

module.exports.addReply = function (reply, callback) {
    Comment.addReply(reply, (err)=>{
        if (err) throw err;
        reply.save(callback);
    });
};
module.exports.editReply = function (editedReply, callback) {
    const query = { _id: editedReply._id };
    Reply.updateOne(query, { content: editedReply.content}, callback);
};
module.exports.deleteComment = function (id, callback) {
    Reply.deleteOne({ _id: id }, callback);
};