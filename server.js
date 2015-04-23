var methodOverride = require('method-override');
var expressSession = require('express-session');
var LocalStrategy  = require('passport-local').Strategy;
var bodyParser     = require('body-parser');
var passport       = require('passport');
var mongoose       = require('mongoose');
var express        = require('express');
var multer         = require('multer')
var db             = require('./config/db');  
var app            = express();
var User           = require('./app/models/user');
var initPassport   = require('./app/auth/init');
var flash          = require('connect-flash');
var morgan          = require('morgan');

var env            = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if( env === 'development') {
  mongoose.connect(db.developmentUrl);
}
else {
  mongoose.connect(db.productionUrl);
}

initPassport(passport);

var port =  process.env.PORT || 3000;
app.use(morgan('combined'));
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./app/auth/init');


app.use(bodyParser.json()); 
app.use(multer({ dest: './uploads/'}));
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


require('./app/routes')(app, passport).listen(port, function() {
  console.log('App running on port ' + port);
}); 

module.exports = app;

// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(methodOverride('X-HTTP-Method-Override'));