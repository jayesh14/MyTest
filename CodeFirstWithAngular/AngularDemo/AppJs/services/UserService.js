(function () {
    'use strict';
    app.service('UserService', ['$http', '$q', 'AuthenticationService', 'AuthData',
    function ($http, $q, authenticationService, authData) {
        this.save = function (User) {
            var request = $http({
                method: "post",
                url: serviceBase + "SaveUser",
                data: User
            }).success(function (data, status, header, config) {
               
            });
            return request;
        }

        this.getAllUser = function () {
            return $http.get(serviceBase + "SystemUser/Get");
        };

        this.getUser = function (UserID) {
            var url = serviceBase + "SystemUser/GetUser/" + UserID;
            return $http.get(url);
        };

        this.delete = function (UserID) {
            var request = $http({
                method: "delete",
                url: serviceBase + "SystemUser/DeleteUser/" + UserID
            });
            return request;
        }
    }
    ]);
})();




