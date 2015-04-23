var Admin = require('../models/admin');

module.exports = {
  addAdmin: function(req, res) {
    var body = req.body;
    console.log(body );
    Admin.create(body, function(err) {
      if(err) {
        res.json( err );
      }      
      res.json( { message: "Succesfully added", body: body });
    });
  },

  getAdmin: function(req, res) {
    Admin.find(function(err, doc){
      if(err)
        res.send('An error occured..');
      res.json(doc);
    });
  }
}
