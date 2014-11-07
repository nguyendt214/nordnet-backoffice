var p5User = angular.module('p5User', []);

p5User.config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {

  $stateProvider
      .state('user', {
        url: '/user',
        controller: 'p5UserCtrl',
        templateUrl: "pages/user/views/user.list.tpl.html",
        data: { pageTitle: 'User List Page' }
      })
      .state('userAccount', {
        url: '/user/:id/account',
        controller: 'p5UserAccountCtrl',
        templateUrl: "pages/user/views/user.account.tpl.html",
        data: { pageTitle: 'Account Page' }
      })
      .state('user_new', {
        url: '/user_new',
        controller: 'p5UserCtrl',
        templateUrl: "pages/user/views/user.new.tpl.html",
        data: { pageTitle: 'Add new User' }
      })
      .state('user_edit', {
        url: '/user/:id/edit',
        controller: 'p5UserEditCtrl',
        templateUrl: "pages/user/views/user.edit.tpl.html",
        data: { pageTitle: 'Edit User' }
      });
}]);

p5User.controller('p5UserCtrl', ['$scope', function ($scope) {

}]);

p5User.controller('p5UserEditCtrl', ['$scope', function ($scope) {

}]);

p5User.controller('p5UserAccountCtrl', ['$scope', function ($scope) {
  $scope.customer = {
    id: '1',
    number: '0623456567',
    email: 'ndotrong@pentalog.fr',
    origine: 'Nordnet',
    etat_du_compte: 'Opérationnel',
    offre: 'Premium',
    created_date: '18.1 mois',
    end_date: '01/12/2015',
    disabled_at: 1,
    msisdn: '0623432345'
  };
}]);
