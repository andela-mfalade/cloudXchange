var resourceservice = angular.module('resourceservice', [])
  .factory('resourceService', ['$http', function ($http) {  
    return {
      getResources: function(callbackFn) {
        $http.get('/resources')
          .success(function(data){
            callbackFn(data);
          })
          .error(function(error) {
            console.log(error);
          });     
      },

      updateSchedule: function(resourceId, param) {
        $http.put('resources/' + resourceId, param)
          .then(function(){
            console.log("I think we are done here");
          });
      }
    }
}]);