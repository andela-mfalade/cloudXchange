var methodOverride = require('method-override'),
    expressSession = require('express-session'),
    LocalStrategy  = require('passport-local').Strategy,
    bodyParser     = require('body-parser'),
    passport       = require('passport'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    db             = require('./config/db'),
    app            = express(),
    User           = require('./app/models/user'),
    initPassport   = require('./app/auth/init'),
    flash          = require('connect-flash'),
    morgan         = require('morgan'),

var env            = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port           =  process.env.PORT || 3000;

if( env === 'development') {
  mongoose.connect(db.developmentUrl);
}
else {
  mongoose.connect(db.productionUrl);
}

initPassport(passport);

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

app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


require('./app/routes')(app, passport).listen(port, function() {
  console.log('App running on port ' + port);
}); 

module.exports = app;

// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(methodOverride('X-HTTP-Method-Override'));