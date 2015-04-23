var passport = require('passport');
var init     = require('../auth/init');

module.exports = {
  login: function(req, res) {
    init.login();
  }
};