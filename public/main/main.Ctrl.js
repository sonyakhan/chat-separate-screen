(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {

    $scope.users = [];
    $scope.likes = [];

    // nickname passed from join page, to $localStorage, to this ctrl now
    $scope.myNickname = $localStorage.nickname;

    var nickname = $scope.myNickname;
    // we want to retrieve the users with custom emit method called get-users
    socket.emit('get-users');
    socket.on('all-users', function(data){
      console.log(data);
      $scope.users = data.filter(function(item){
        return item.nickname !== nickname;
      });
    });
  };
})();
