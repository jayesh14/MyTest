(function () {
    'use strict';
    app.controller('LoginController', ['$scope', 'LoginService', 'AuthData', '$location', function ($scope, loginService, authData, $location) {
        $scope.userDetail = {
            UserName: "",
            Password: ""
        }

        $scope.login = function () {
            loginService.login($scope.userDetail).then(function (response) {
                if (response.data != null && response.data.SystemUserID > 0) {
                    loginService.getToken(response.data);
                    $location.path('/home');
                } else { console.log("user name and password wrong") }
            });
        }

    }]);
})();

