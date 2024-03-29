var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
var Message = require('../models/message');

router.get('/', (req, res, next) => {
   Message.find()
   
      .then((messages) => {
         console.log(messages);
         res.status(200).json({
            message: 'Messages fetched successfully',
            messages: messages
         });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
         });
      });
});

router.post('/', (req, res, next) => {
   const maxMessageId = sequenceGenerator.nextId('messages');

   const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
   });

   message.save()
      .then(createdMessage => {
         res.status(201).json({
            message: 'Message added successfully',
            message: createdMessage
         });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occured',
            error: error
         });
      });
});


module.exports = router;