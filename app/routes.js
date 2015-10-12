var passport   = require('passport'),
    init       = require('./auth/init')(passport),
    auth       = require('./controllers/authCtrl'),
    userFn     = require('./controllers/userCtrl'),
    adminFn    = require('./controllers/adminCtrl'),
    loginFn    = require('./controllers/loginCtrl'),
    commentFn  = require('./controllers/commentCtrl'),
    resourceFn = require('./controllers/resourceCtrl'),
    flash      = require('connect-flash'),
    multiparty = require('connect-multiparty'),
    multipartyWare = multiparty();


module.exports = function(app, passport) {

  app.post     ('/auth/login', auth.loginUser                 );
  app.post     ('/auth/signup', auth.signupUser               );

  app.get     ('/users/me', auth.returnUserDetails            );

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
  app.put     ('/resources/:_id', resourceFn.updateResource   );
  app.post    ('/api/resources', resourceFn.addResource       );
  app.delete  ('/resource/:_id', resourceFn.deleteResource    );

  return app;
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}