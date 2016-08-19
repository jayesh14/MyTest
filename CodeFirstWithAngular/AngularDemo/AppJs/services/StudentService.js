(function () {
    'use strict';
    app.service('StudentService', ['$http', '$q', 'AuthenticationService', 'AuthData',
    function ($http, $q, authenticationService, authData) {
        this.save = function (Student) {
            var request = $http({
                method: "post",
                url: serviceBase + "SaveStudent",
                data: Student,
                header: authenticationService.setHeader($http)
            }).success(function (data, status, header, config) {

            });
            return request;
        }

        this.getAllStudent = function (paginationOptions) {
            return $http.post(serviceBase + "GetStudent",paginationOptions, { header: authenticationService.setHeader($http) });
        };

        this.getUser = function (UserID) {
            var url = serviceBase + "GetStudent/" + UserID;
            return $http.get(url);
        };

        this.delete = function (UserID) {
            var url = serviceBase + "DeleteStudent/" + UserID;
            return $http.get(url);
        }
    }
    ]);
})();