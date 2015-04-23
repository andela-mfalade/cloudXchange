var mongoose = require('mongoose');

var commentSchema  = mongoose.Schema({
  commentBy    : String,
  comment      : String,
  resourceId   : String,
  commentedOn  : { 
    type: Date, 
    default: Date.now()
  }
});

module.exports  = mongoose.model('Comment', commentSchema, 'comment');