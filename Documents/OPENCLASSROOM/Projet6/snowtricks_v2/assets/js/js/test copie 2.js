var app = angular.module('app', ['ngResource']);






app.factory('Notes', ['$resource', function($resource) {
  return $resource('/notes/:id', {id: '@id'}, {
    update: {method: 'PUT'}
  });
}]);




app.controller('NotesCtrl', ['$location', 'Notes', function($location, Notes) {
  
  
  
  	
  	$http.get('http://127.0.0.1:8000/figure/18').then(console.log('test', rep), console.log('test'));
  
  
  
}]);




