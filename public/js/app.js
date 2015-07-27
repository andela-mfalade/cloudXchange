var App = angular.module('App', [
    'ngRoute',
    'appRoutes',
    'mainModule', 
    'userModule',
    'loginModule', 
    'adminModule',
    'errorModule', 
    'signupModule',
    'profileModule', 
    'resourceModule',
    'fileuploadModule', 
    'angularModalService',
    'commentModule', 
    'angularFileUpload'
])
  .factory('_', ['$window', function($window){
      // Store lodash locally
      var _ = $window._;

      // Delete the global lodash reference.. Something about not frosh to have lodash on a global scope
      delete( $window._ );

      // Return the formerly global refernce so it can be injected
      return $window._;
  }]);
