var app = angular.module('BlankApp', ['ngRoute', 'ngMaterial']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/timesheet', {
      templateUrl: 'views/timesheet.html',
      controller: 'TimeSheetController'
    })
    .otherwise({
      redirectTo: '/timesheet'
    });
});    
app.controller('TimeSheetController', function($scope) {
  
  $scope.toJson = function(dt) {
    return {
      m: dt.getMonth(),
      month: dt.getMonthAsString(),
      dw: dt.getDay(),
      d: dt.getUTCDate(),
      day: dt.getDayAsString()
    };
  };

  $scope.initDays = function(d) {
    var dt = new Date(d.getTime());
    dt.setUTCDate(1); // set to first day of month
    var days = [];

    // first days of the first week
    var dt2 = new Date(dt.getTime());
    while (dt2.getDay() > 0) {
      dt2 = dt2.add('day', -1);
      days.splice(0, 0, $scope.toJson(dt2));
    }

    // to the end of the month
    dt2 = new Date(dt);
    // first day
    days.push($scope.toJson(dt2));
    // other days
    while (dt2.getMonth() == d.getMonth()) {
      dt2 = dt2.add('day', 1);
      days.push($scope.toJson(dt2));
    }
    return days;
  }; // initDays

  $scope.initAll = function(d) {
    $scope.data = {
      now: d,
      previous: d.add('month', -1),
      next: d.add('month', +1),
      days: $scope.initDays(d)
    };
  };

  $scope.initAll(new Date());

  $scope.next = function() {
    $scope.initAll($scope.data.now.add('month', 1));
  };

  $scope.previous = function() {
    $scope.initAll($scope.data.now.add('month', -1));
  };

  $scope.working = function(d) {
    return d.dw != '0' && d.dw != '6';
  };

});