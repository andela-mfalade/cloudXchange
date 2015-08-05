var resourceservice = angular.module('resourceservice', [])
  .factory('resourceService', ['$http', '$window', function ($http, $window) {  
    var randomColorObject = {randomColor: 'green'};
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

      getResource: function(arg, cbf) {
        $http.get('/resources/' + arg)
          .success(function(data) {
            cbf(data);
          })
          .error(function(err) {
            console.log('Error getting resources.');
          })
      },

      updateSchedule: function(resourceId, param) {
        $http.put('resources/' + resourceId, param)
          .then(function(){
            return true;
          });
      },

      shuffleBGcolor: function() {
        var randomVal = Math.ceil(Math.random() * 6);
        var colors = ['green', 'blue', 'red', 'orange', 'purple', 'navy_blue'];
        randomColorObject.randomColor = colors[randomVal - 1];
        return randomColorObject;
      },

      storeResourceID_inLocalStorage: function (resource, property) {
        if(property == 'id')  $window.localStorage.setItem('currentResourceID', resource);
        if(property == 'cat') $window.localStorage.setItem('currentResourceCATEGORY', resource);
      },

      getCachedResource: function () {
        var resourceInLocalStorageID       = $window.localStorage.getItem('currentResourceID');
        var resourceInLocalStorageCATEGORY = $window.localStorage.getItem('currentResourceCATEGORY');
        var resourceInLocalStorage = {
          resourceID:       resourceInLocalStorageID,
          resourceCATEGORY: resourceInLocalStorageCATEGORY
        };
        return resourceInLocalStorage;
      },

      randomColorStore: function() {
        return randomColorObject;
      }
    }
}]);