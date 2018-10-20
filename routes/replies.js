var express = require('express');
var router = express.Router();
const passport = require('passport');
const Reply = require('../models/reply');

router.post('/add', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author){
        //Checking body parameters are defined
        if(req.body.author && req.body.content && req.body.replies_to){
            let reply = new Reply({
                author: req.body.author,
                content: req.body.content,
                replies_to: req.body.replies_to
            });
            Reply.addReply(reply, (err, reply) =>{
                if(err){
                    res.json({success: false, message: 'Fail to store reply', error: err});
                } else {
                    res.json({success: true, message: 'Reply stored.',reply: reply});
                }
            });
        }else {res.sendStatus(400)}
    }else {res.sendStatus(401)}

});
router.put('/edit',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author) {
        //Checking body parameters are defined
        if (req.body.author && req.body.content ) {
            let reply = new Reply({
                _id: req.body._id,
                author: req.body.author,
                content: req.body.content
            });
            Reply.editReply(reply, (err, response)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to edit reply.`, error: err});
                } else {
                    if (response.nModified === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Reply edited.`});
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
            Reply.deleteComment(req.body._id, (err, response) => {
                if (err){
                    res.json({success: false, message: `Fail trying to delete reply.`, error: err});
                } else {
                    console.log(response);
                    if (response.n === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Reply deleted.`});
                    }
                }
            })
        } else res.sendStatus(400);
    }else res.sendStatus(401);
});

module.exports = router;
