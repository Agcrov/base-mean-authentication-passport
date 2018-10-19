const mongoose = require('mongoose');
const Comment = require('./comment');
const config = require('../config/database');

const ReplySchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true},
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