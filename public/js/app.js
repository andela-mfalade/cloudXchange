var App = angular.module('App', [
  'ngRoute',                 'appRoutes',
  'mainModule',              'userModule',
  'loginModule',             'adminModule',
  'errorModule',             'signupModule',
  'profileModule',           'resourceModule',
  'fileuploadModule',        'angularModalService',
  'commentModule',           'angularFileUpload'
]);