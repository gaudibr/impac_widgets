angular.module('map_widget', ['ngMap', 'ui.router', 'templates']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('locations', {
      url: '/locations',
      templateUrl: '/locations.html',
      controller: 'EmployeeLocationsCtrl',
      resolve: {
         locationPromise: ['locations', function(locations) {
          return locations.getAll();
    }]}
    });

    $urlRouterProvider.otherwise('locations')
}]);

angular.module('map_widget')
.factory('locations', [
'$http', 
function($http) {
   
    var o = {
        locations: []
    }
    
     o.getAll = function() {
        return $http.get('/impac_queries.json').success(function(data){
            angular.copy(data, o.locations);
        });
    };
    
    return o;
}]);

angular.module('map_widget')
.controller('EmployeeLocationsCtrl', ['$scope', 'locations', function($scope, locations) {
    $scope.image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',        
        size: [20, 32], 
        origin: [0,0],
        anchor: [0, 32]
    };
    
    $scope.shape = {
        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };
    
    $scope.locations = locations.locations
    
    $scope.positions = $scope.locations.map(function(item) {
      return item.position;
    });
    
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i<$scope.positions.length; i++) {
      var latlng = new google.maps.LatLng($scope.positions[i][0], $scope.positions[i][1]);
      bounds.extend(latlng);
    }
    
    $scope.$on('mapInitialized', function(event, map) {
          map.setCenter(bounds.getCenter());
          map.fitBounds(bounds);
        });
    
    $scope.getRadius = function(num) {
        return Math.sqrt(num) * 200;
    };
}]);