var p5Search = angular.module('p5Search', []);
p5Search.config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('search', {
            url: "/search",
            controller: "p5SearchCtrl",
            templateUrl: "pages/search/views/search.tpl.html",
            data: { pageTitle: 'Search Page' }
          })
      ;
    }])
    .controller("p5SearchCtrl", function ($scope, CustomerService) {

      //$scope.customers = CustomerService.getCustomers();
      $scope.customers = [];

      $scope.p5FunctionSearchCustomer = function () {
        var searchQuery = $scope.p5SearchCustomer;
        $scope.customers = CustomerService.addFilter(searchQuery);
        $scope.isEmpty = CustomerService.isEmpty($scope.customers);
        $scope.showResult = true;
        console.log($scope.isEmpty);
      };

      $scope.isEmpty = CustomerService.isEmpty($scope.customers);
      $scope.showResult = false;
      console.log($scope.isEmpty);
    });

