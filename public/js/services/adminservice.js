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
            console.log('Resource deleted from database\nDetails: ' + arg);
          })
          .error(function(err) {
            console.log('Error deleting resource.', err);
          })
      },

      deleteUser: function(userId) {
        $http.delete('/user/' + userId)
          .success(function(data){
            console.log('User Deleted..')
          })
          .error(function(error) {
            console.log(error);
          });     
      } 
    }
}]);