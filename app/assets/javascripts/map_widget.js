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

    $scope.locations = locations.locations
    
    $scope.positions = $scope.locations.map(function(item) {
      return item.position;
    });
    
    $scope.dynMarkers = [];
    var bounds = new google.maps.LatLngBounds();
    
    for (var i=0; i<$scope.positions.length; i++) {
      var latLng = new google.maps.LatLng($scope.positions[i][0], $scope.positions[i][1]);
      $scope.dynMarkers.push(new google.maps.Marker({position:latLng}));
      bounds.extend(latLng);
    }
    $scope.$on('mapInitialized', function(event, map) {
      $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    });
    
}]);