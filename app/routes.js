var passport   = require('passport');
var init       = require('./auth/init')(passport);
var userFn     = require('./controllers/userCtrl');
var adminFn    = require('./controllers/adminCtrl');
var loginFn    = require('./controllers/loginCtrl');
var commentFn  = require('./controllers/commentCtrl');
var resourceFn = require('./controllers/resourceCtrl');
var flash      = require('connect-flash');
var multiparty = require('connect-multiparty');
var multipartyWare = multiparty();


module.exports = function(app, passport) {
  app.post    ('/auth/login',   passport.authenticate('login' ));
  app.post    ('/auth/signup' , passport.authenticate('signup'));

  app.get     ('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get     ('/api/admin', adminFn.getAdmin                 );
  app.post    ('/api/admin', adminFn.addAdmin                 );

  app.get     ('/users',  userFn.getUsers                     );     
  app.get     ('/user/:_id' , userFn.getUser                  );
  app.post    ('/user/users', userFn.addUser                  );
 
  app.delete  ('/user/:_id', userFn.removeUser                );

  app.get     ('/comments/:resourceId', commentFn.getComments );
  app.get     ('/comments/', commentFn.fetchAllComments       );
  app.post    ('/api/comments', commentFn.addComment          );

  app.get     ('/resources',      resourceFn.getResources     );
  app.get     ('/resources/:_id', resourceFn.getResource      );
  app.post    ('/api/resources', resourceFn.addResource       );
  app.delete  ('/resource/:_id', resourceFn.deleteResource    );

  return app;
}


function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}