(function () {
    'use strict';
    app.controller('MainController', ['$scope', 'AuthData', '$location', 'LoginService',  function ($scope, authData, $location, loginService) {
        $scope.IsAuthenticated = authData.IsAuthenticated;
        $scope.UserName = authData.UserName;
        $scope.logOut = function () {
            loginService.logOut();
            $location.path('/login');
        }

        $scope.$watch(function () {
            return authData.IsAuthenticated;
        }, function (NewValue, OldValue) {
            $scope.IsAuthenticated = authData.IsAuthenticated;
            $scope.UserName = authData.UserName;
        });

    }]);
})();

