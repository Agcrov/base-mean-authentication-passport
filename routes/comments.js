var express = require('express');
var router = express.Router();
const passport = require('passport');
const Comment = require('../models/comment');

router.get('/',(req, res, next) =>{
   Comment.getAll((err, comments)=>{
       if(err){
           res.json({success: false, message: 'Fail to retrieve all comments', error: err});
       } else {
           res.json({success: true, message: 'Comments fetched.',comments: comments});
       }
   });
});

router.post('/add', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author){
        //Checking body parameters are defined
        if(req.body.author && req.body.content){
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
        }else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }

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
router.put('/edit',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.comment.author) {
        //Checking body parameters are defined
        if (req.body.comment.author && req.body.comment.content ) {
            let comment = new Comment({
                _id: req.body.comment._id,
                author: req.body.comment.author,
                content: req.body.comment.content
            });
            Comment.editComment(comment, (err, response)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to edit comment.`, error: err});
                } else {
                    if (response.nModified === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Comment edited.`});
                    }
                }
            })
        }else {
            res.sendStatus(400);
        }
    }else {
        res.sendStatus(401);
    }
});
router.delete('/delete', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author) {
        //Checking body parameters are defined
        if (req.body._id) {
            Comment.deleteComment(req.body._id, (err, response) => {
                if (err){
                    res.json({success: false, message: `Fail trying to delete comment.`, error: err});
                } else {
                    console.log(response);
                    if (response.n === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Comment deleted.`});
                    }
                }
            })
        } else res.sendStatus(400);
    }else res.sendStatus(401);
});
module.exports = router;
