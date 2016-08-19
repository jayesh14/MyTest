(function () {
    'use strict';
    app.controller('RegistrController', ['$scope', 'UserService', '$location', function ($scope, userService, $location) {
        $scope.userDetail = {
            UserName: "",
            Password: "",
            CPassword: ""
        }

        $scope.save = function () {
            userService.save($scope.userDetail).then(function (response) {
                $location.path('/login');
            });
        }

    }]);
})();

