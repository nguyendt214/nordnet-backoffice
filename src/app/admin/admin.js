var p5Admin = angular.module('p5Admin', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.calendar',
  'ui.bootstrap',
  'ui.checkbox',
  'ui.knob',
  'ui.switchery',
  'pascalprecht.translate',
  'p5Translate'
]);

p5Admin.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
      .state('login', {
        url: "/login",
        controller: "p5AdminCtrl",
        templateUrl: "admin/login.tpl.html",
        data: { pageTitle: 'Login Page' }
      })
  ;
}]);

p5Admin.controller('p5AdminCtrl', ['$scope', function ($scope) {

}]);
