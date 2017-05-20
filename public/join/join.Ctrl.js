(function() {
  'use strict';

  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

  function JoinCtrl($location, $scope, $localStorage, socket) {
    $scope.name = '';
    var nickname;

    // join room method, triggered on ng-submit button from join.html
    $scope.join = function() {
      nickname = $scope.name;
      $localStorage.nickname = nickname;

      // hook up user that just joined
      socket.emit('join', {
        nickname: nickname;
      });

      // routes to main page after function is triggered
      $location.path('/main');
    };
  }
})();
