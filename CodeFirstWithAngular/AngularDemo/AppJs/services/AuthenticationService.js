(function () {
    'use strict';
    app.service('AuthenticationService', ['$http', '$q', '$window', '$localStorage',
        function ($http, $q, $window, $localStorage) {

            this.create = function (data) {
                $localStorage.userId = data.SystemUserID;
                $localStorage.user = data.UserName;
                $localStorage.userRole = data.userRole;
            };

            this.userId = function () {
                return $localStorage.userId;
            };

            this.user = function () {
                return $localStorage.user;
            };

            this.userRole = function () {
                return $localStorage.userRole;
            };

            this.destroy = function () {
                $localStorage.$reset();
            };

            var tokenInfo;

            this.setTokenInfo = function (data) {
                tokenInfo = data;
                $window.sessionStorage["TokenInfo"] = JSON.stringify(tokenInfo);
            }

            this.getTokenInfo = function () {
                return tokenInfo;
            }

            this.removeToken = function () {
                tokenInfo = null;
                $window.sessionStorage["TokenInfo"] = null;
            }

            this.init = function () {
                if ($window.sessionStorage["TokenInfo"]) {
                    tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
                }
            }

            this.setHeader = function (http) {
                delete http.defaults.headers.common['X-Requested-With'];
                if ((tokenInfo != undefined) && (tokenInfo.AuthToken != undefined) && (tokenInfo.AuthToken != null) && (tokenInfo.AuthToken != "")) {
                    http.defaults.headers.common['Token'] = tokenInfo.AuthToken;
                    http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
            }

            this.validateRequest = function () {
                var url = serviceBase + 'api/home';
                var deferred = $q.defer();
                $http.get(url).then(function () {
                    deferred.resolve(null);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            this.init();
        }
    ]);
})();