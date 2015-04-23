var User = require('../models/user');

module.exports = {
  addUser: function(req, res) {
    var body = req.body;
    console.log(body );
    User.create(body, function(err) {
      if(err) {
        res.json( err );
      }      
      res.json( { message: "Succesfully added", body: body });
    });
  },

  getUsers: function(req, res) {
    User.find(function(err, doc){
      if(err)
        res.send('An error occured..');
      res.json(doc);
    });
  },

  getUser: function(req, res) {
    User.findById(req.params['_id'], function(err, doc){
      if(err)
        res.send('An error occured..');
      res.json(doc);
    });
  },

  removeUser: function(req, res) {
    User.remove({_id: req.params['_id']}, function(err){
      if(err)
        res.send('User cannot be deleted, sorry');
      res.json({
        status: '200',
        message: 'User Succesfully deleted'
      });
    })
  },

  authenticate: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.json({
        message: 'You have to be logged in to view this page.'
      });
      return true;
    }
    next();
  }
}
