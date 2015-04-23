angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'resourceCtrl'
      })

      .when('/admin', {
        templateUrl: '/views/admin.html',
        controller: 'adminCtrl'
      })

      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'profileCtrl'
      })

      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginCtrl'
      })

      .when('/resources/:resource', {
        templateUrl: '/views/resources.html',
        controller: 'commentCtrl'
      })

      .when('/users', {
        templateUrl: '/views/users.html',
        controller: 'userCtrl'
      })

      .when('/resources', {
        templateUrl: '/views/resources.html',
        controller: 'resourceCtrl'
      })

      .when('/fileupload', {
        templateUrl: '/views/fileupload.html',
        controller: 'uploadCtrl'
      })

      .when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'signupCtrl'
      })

      .when('*', {
        templateUrl: '/views/home.html',
        controller: 'mainCtrl'
      })

      .otherwise({
        redirectTo: function() {
          window.location = "/views/error.html";
        }
    });
  }]);