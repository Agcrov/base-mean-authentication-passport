var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');
const config = require('../config/database');

router.post('/add',(req, res, next)=>{
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
});

module.exports = router;
