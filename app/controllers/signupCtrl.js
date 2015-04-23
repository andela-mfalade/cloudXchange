var passport = require('passport');
var init     = require('../auth/init');

module.exports = {
  signup: function(req, res) {
    init.login();
  }
};