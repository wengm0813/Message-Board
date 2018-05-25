var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');

var User =  require('../models/user');
//backend get data
router.get('/', function (req, res, next) {
    Message.find()
        .populate('user','firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});
// on each request this method will be reach
router.use('/', function(req, res, next){
    jwt.verify(req.query.token,'secret',function(err,decoded){
        if (err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            })
        }
        next();
    })
});
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id,function(err, user){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //save message to user's array
            user.messages.push(result._id);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });

});

//edit
router.patch('/:id', function (req, res,next){
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, function(err, message){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!message){
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated!',
                error: {message: 'User do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });

    })
});


router.delete('/:id', function (req, res,next){
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!message){
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }

        if (message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated!',
                error: {message: 'User do not match'}
            });
        }

        message.remove(function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });

    })
});


module.exports = router;
