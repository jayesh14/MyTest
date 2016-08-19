(function () {
    'use strict';
    app.controller('HomeController', ['$scope', function ($scope) {

        $scope.userDetail = {
            UserName: "My@gmail.com",
            Password: "12",
            CPassword: "12"
        };
    }]);
})();