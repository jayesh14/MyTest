(function () {
    'use strict';
    app.service('ProductService', ['$http', '$q', 'AuthenticationService', 'AuthData',
    function ($http, $q, authenticationService, authData) {
        this.save = function (data) {
            var request = $http({
                method: "post",
                url: serviceBase + "Product/Save",
                data: data,
                header: authenticationService.setHeader($http)
            }).success(function (data, status, header, config) {

            });
            return request;
        }

        this.getAll = function (paginationOptions) {
            return $http.post(serviceBase + "Product/GetAll", paginationOptions, { header: authenticationService.setHeader($http) });
        };

        this.getProduct = function (ID) {
            var url = serviceBase + "Product/Get/" + ID;
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




