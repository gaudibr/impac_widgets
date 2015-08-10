angular.module('map_widget', ['ngMap', 'ui.router', 'templates']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('locations', {
      url: '/locations',
      templateUrl: '/map_widget.html',
      controller: 'EmployeeLocationsCtrl',
      resolve: {
         locationPromise: ['locationsFactory', function(locations) {
          return locations.getAll();
    }]}
    })
    .state('sales_channels', {
      url: '/sales_channels',
      templateUrl: '/map_widget.html',
      controller: 'SalesChannelCtrl',
      resolve: {
         salesChannelPromise: ['invoice_dataFactory', function(invoice_data) {
          return invoice_data.getAll();
    }]}
    })

    $urlRouterProvider.otherwise('sales_channels')
}]);

angular.module('map_widget')
.factory('locationsFactory', [
'$http', 
function($http) {
   
    var o = {
        locations: []
    }
    
     o.getAll = function() {
        return $http.get('/employees.json').success(function(data){
            angular.copy(data, o.locations);
        });
    };
    
    return o;
}]);

angular.module('map_widget')
.factory('invoice_dataFactory', [
'$http', 
function($http) {
   
    var o = {
        invoice_data: []
    }
    
     o.getAll = function() {
        return $http.get('/invoices/customers.json').success(function(data){
            angular.copy(data, o.invoice_data);
        });
    };
    
    return o;
}]);

angular.module('map_widget')
.controller('EmployeeLocationsCtrl', ['$scope', 'locationsFactory', function($scope, locations) {

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

angular.module('map_widget')
.controller('SalesChannelCtrl', ['$scope', 'invoice_dataFactory', function($scope, invoice_data) {

    $scope.invoice_data = invoice_data.invoice_data
    
    $scope.positions = $scope.invoice_data.map(function(item) {
      return item.position;
    });
    
    $scope.dynMarkers = [];
    var bounds = new google.maps.LatLngBounds();
    
    for (var i=0; i<$scope.invoice_data.length; i++) {
      var position = $scope.invoice_data[i].position
      var value = $scope.invoice_data[i].amount_invoiced
      var name = $scope.invoice_data[i].name
      var title = name + "\n- " + "Total Invoiced: $ " + value.toFixed(2);
      var latLng;
      var realLocation = false;
      if (position != null) {
        latLng = new google.maps.LatLng(position[0], position[1]);
        realLocation = true;
      }
      else {
        latLng = new google.maps.LatLng(-6.846733, -153.664305);
      }
      $scope.dynMarkers.push(new google.maps.Marker({position:latLng, value: value, title: title, name: name, realLocation: realLocation}));
      bounds.extend(latLng);
    }
    
    function total( markers, numStyles) {
      var index = 0;
      var total = 0;
      var flag = false;
      var flagText = "";
      for (var i=0; i< markers.length; i++) {
        total = total + markers[i].value;
        if(!markers[i].realLocation) flag = true;
      }
      if(flag) flagText = "\nThis marker contains data from transactions without valid addresses"
      
      var count = markers.length.toString();

      var dv = count;
      while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
      }
    
      index = Math.min(index, numStyles);
      
      return {
        text: "$ " + total.toFixed(2),
        index: index,
        title: count + " customers\n" +  "$ " + total.toFixed(2) + flagText
      };
    };
    
    $scope.$on('mapInitialized', function(event, map) {
      $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {'calculator': total});
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    });
}]);