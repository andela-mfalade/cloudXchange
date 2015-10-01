var adminservice = angular.module('adminservice', [])
  .factory('adminService', ['$http', function ($http) {  
    return { 
      getResources: function(cb) {
        $http.get('/resources')
          .success(function(data){
            cb(data);
          })
          .error(function(error) {
            cb(err);
          }); 
      },

      getUsers: function(cb) {
        $http.get('/users')
          .success(function(data){
            cb(data);
          })
          .error(function(error) {
            cb(err);
          }); 
      },

      deleteResource: function(arg) {
        $http.delete('/resource/' + arg)
          .success(function() {
            return true
          })
          .error(function(err) {
            return false
          })
      },

      deleteUser: function(userId) {
        $http.delete('/user/' + userId)
          .success(function(data){
            return true
          })
          .error(function(error) {
            return false
          });     
      } 
    }
}]);