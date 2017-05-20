(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    // nickname passed from join page, to $localStorage, to this ctrl now
    $scope.myNickname = $localStorage.nickname;
  };
})();
