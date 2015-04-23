var fileuploadservice = angular.module('fileuploadservice', [])
  .factory('uploadService', ['$http', function ($http) {  
    return { 
      addFile: function(arg) {
        $http.post('/api/resources', arg)
          .success(function() {
            console.log('Resource added to database\nDetails: ' + arg);
          })
          .error(function() {
            console.log('Error adding user.');
          })
      }
    }
}]);