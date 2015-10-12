var methodOverride = require('method-override'),
    expressSession = require('express-session'),
    LocalStrategy  = require('passport-local').Strategy,
    cookieParser   = require('cookie-parser')
    bodyParser     = require('body-parser'),
    passport       = require('passport'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    db             = require('./config/db'),
    app            = express(),
    User           = require('./app/models/user'),
    initPassport   = require('./app/auth/init'),
    flash          = require('connect-flash'),
    morgan         = require('morgan')

var env            = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port           =  process.env.PORT || 3000;

if( env === 'development') {
  mongoose.connect(db.developmentUrl);
}
else {
  mongoose.connect(db.productionUrl);
}


// Express helper modules
app.use(morgan('dev')); // Log every request to the console
app.use(cookieParser())  // Read cookies needed for auth
app.use(bodyParser.json()); // Log every request to the console


// REQUIRED FOR PASSPORT
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Use connect flash for flash messages stored in session
require('./app/auth/init');


initPassport(passport);


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