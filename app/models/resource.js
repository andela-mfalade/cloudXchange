var mongoose = require('mongoose');

var resourceSchema  = mongoose.Schema({
  category     : String,
  title        : String,
  contributor  : String,
  fileType     : String,
  file         : String,
  resourceLink : String,
  resourceSlug : String,
  likes        : { type: Number, default: 0},
  views        : { type: Number, default: 0},
  registered   : { type: Date, default: Date.now }
});

module.exports  = mongoose.model('Resource', resourceSchema, 'resource');