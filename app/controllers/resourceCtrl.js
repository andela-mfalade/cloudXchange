var Resource = require('../models/resource');

module.exports = {
  getResources: function(req, res) {
    Resource.find(function(err, doc){
      if(err) {
        res.send('Failed to load resources.');
      }
      res.json(doc);
    });
  },

  uploadFile: function(req, res) {
    debugger;
    var body = req.body;
    console.log('req files: ', req.files);
  },

  updateResource: function(req, res) {
      var resource_id = req.params._id;
      var action = req.body.action;
      Resource.findById(resource_id, function (err, resource) {
        if (err)
          return res.json({ error: { message: "An unidentified error occured", code: 9000, err: err } });
        else
          if(action === 'like') resource.likes += 1;
          if(action === 'unlike') resource.likes -= 1;
          if(action === 'view') resource.views += 1;

          resource.save(function(err, doc) {
            if(err)
              return res.json({ error: { message: "An unidentified error occured.", code: 9000, err: err } });
            else
              res.json({ message: "Resource details updated.", code: 2222 });
          });
      });
  },


  getResource: function(req, res) {
    Resource.find({_id: req.params['_id']}, function(err, doc){
      if(err) {
        res.send('Failed to get resource.');
      }
      res.json(doc);
    });
  },

  addResource: function(req, res) {
    var body = req.body;
    Resource.create(body, function(err) {
      if(err) {
        res.json( err );
      }      
      res.json( { message: "Succesfully added", body: body });
    });
  },

  deleteResource: function(req, res) {
    Resource.remove({_id: req.params['_id']}, function(err){
      if(err)
        res.send('Resource cannot be deleted, sorry');
      res.json({
        status: '200',
        message: 'Resource succesfully deleted'
      });
    })
  }

};
