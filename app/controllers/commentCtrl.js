var Comment = require('../models/comment');

module.exports = {
  addComment: function(req, res) {
    var body = req.body;
    console.log(body );
    Comment.create(body, function(err) {
      if(err) {
        res.json( err );
      }      
      res.json( { message: "Comment succesfully added", body: body });
    });
  },

  getComments: function(req, res) {
    Comment.find({resourceId: req.params['resourceId']}, function(err, doc){
      if(err)
        res.send('An error occured..');
      res.json(doc);
    });
  },

  fetchAllComments: function(req, res) {
    Comment.find(function(err, doc){
      if(err)
        res.send('An error occured..');
      res.json(doc);
    });
  }
}
