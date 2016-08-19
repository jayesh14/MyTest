(function () {
    'use strict';
    app.service('LoginService', ['$http', '$q', 'AuthenticationService', 'AuthData',
    function ($http, $q, authenticationService, authData) {
        var userInfo;
        var loginServiceURL = 'http://localhost/WebApiDemo/Login';
        var deviceInfo = [];
        this.getToken = function (user) {
            $http.post(serviceBase + 'GetToken', user)
                .success(function (response) {
                    authenticationService.setTokenInfo(response)
                })
            .error(function (err, status) {
                alert("error");
                authData.IsAuthenticated = false;
                authData.userName = null;
                authenticationService.destroy();
            });
        }

        this.login = function (User) {
            var request = $http.post(loginServiceURL, User).success(function (data, status, header, config) {
                if (data != null && data.SystemUserID > 0) {
                    authenticationService.create(data);
                    authData.IsAuthenticated = true;
                    authData.userName = data.userName;
                } else {
                    authenticationService.destroy();
                }

            });
            return request;

        }

        this.logOut = function () {
            authenticationService.removeToken();
            authenticationService.destroy();
            authData.IsAuthenticated = false;
            authData.userName = null;
        }
    }
    ]);
})();