var p5Role = angular.module('p5Role', []);

p5Role.config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {

  $stateProvider
      .state('role', {
        url: '/role',
        controller: 'p5RoleCtrl',
        templateUrl: "pages/role/views/role.list.tpl.html",
        data: { pageTitle: 'Role Listing Page' }
      })
      .state('role_new', {
        url: '/role_new',
        controller: 'p5UserCtrl',
        templateUrl: "pages/role/views/role.new.tpl.html",
        data: { pageTitle: 'Add new Role' }
      })
      .state('role_edit', {
        url: '/role_edit/:id',
        controller: 'p5UserCtrl',
        templateUrl: "pages/role/views/role.edit.tpl.html",
        data: { pageTitle: 'Edit Role' }
      });
}]);

p5Role.controller('p5RoleCtrl', ['$scope', function ($scope) {

}]);
