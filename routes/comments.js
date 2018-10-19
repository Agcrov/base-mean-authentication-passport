var express = require('express');
var router = express.Router();
const Comment = require('../models/comment');
const config = require('../config/database');

router.post('/add',(req, res, next)=>{
    let comment = new Comment({
        author: req.body.author,
        content: req.body.content,
    });
    Comment.addComment(comment, (err, comment) =>{
        if(err){
            res.json({success: false, message: 'Fail to store comment', error: err});
        } else {
            res.json({success: true, message: 'Comment stored.',comment: comment});
        }
    });
});

router.get('/:id',(req, res, next)=>{
    let id = req.params.id;
    let replies = req.query.replies;
    if (id && replies){
        if (replies === 'true'){
            Comment.getCommentWithReplies(id, (err, comment)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to fetch comment and the corresponding replies.`, error: err});
                } else {
                    res.json({success: true, message:`Comment w/replies fetched.`, comment: comment});
                }
            });
        } else {
            Comment.getCommentById(id,(err, comment)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to fetch comment.`, error: err});
                } else {
                    res.json({success: true, message:`Comment fetched.`, comment: comment});
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});
module.exports = router;
