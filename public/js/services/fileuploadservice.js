var fileuploadservice = angular.module('fileuploadservice', [])
  .factory('uploadService', ['$http', function ($http) {  
    return { 
      addFile: function(arg, cb) {
        $http.post('/api/resources', arg)
          .success(function() {
            cb(true);
          })
          .error(function() {
            cb(false);
          })
      }
    }
}]);