(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
      $scope.message = '';
      $scope.messages = [];
      $scope.users = [];

      // nickname passed from join page, to $localStorage, to this ctrl now
      $scope.mynickname = $localStorage.nickname;
      var nickname = $scope.mynickname;
      // want to retrieve the users with custom emit method called get-users
      socket.emit('get-users');

      socket.on('all-users', function(data) {
          console.log(data);
          $scope.users = data.filter(function(item){
              return item.nickname !== nickname;
          });
      });

      socket.on('message-received', function(data) {
        $scope.messages.push(data);
      });

      $scope.sendMessage = function(data) {
          var newMessage = {
            message: $scope.message,
            from: $scope.mynickname
        };
        socket.emit('send-message', newMessage);
          $scope.message = '';
          //$scope.messages.push(newMessage);
    };
  }
})();
