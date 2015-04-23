var commentservice = angular.module('commentservice', [])
  .factory('commentService', ['$http', function ($http) {  
    return {
      getResource: function(arg, cbf) {
        $http.get('/resources/' + arg)
          .success(function(data) {
            cbf(data);
          })
          .error(function(err) {
            console.log('Error getting resources.');
          })
      }, 
      getComments: function(arg, cbf) {
        $http.get('/comments/' + arg)
          .success(function(data) {
            cbf(data);
          })
          .error(function(err) {
            console.log('Error fetching comments.');
          })
      }, 
      addComment: function(arg) {
        $http.post('api/comments', arg)
          .success(function() {
          })
          .error(function() {
            console.log('Error adding comment.');
          })
      }
    }
}]);