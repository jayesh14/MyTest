var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                "containerOne": {
                    templateUrl: 'View/Home.html',
                    controller: 'HomeController'
                }
            }
        })
        .state('pageFirst', {
            url: '/pageFirst',
            views: {
                "containerOne": {
                    templateUrl: 'View/pageFirst.html',
                    controller: 'pageFirstController'
                },
            }
        })
        .state('login', {
            url: '/login',
            views: {
                "containerOne": {
                    templateUrl: 'View/UserManagement/Login.html',
                    controller: 'LoginController'
                }
            }
        })
    .state('register', {
        url: '/register',
        views: {
            "containerOne": {
                templateUrl: 'View/UserManagement/register.html',
                controller: 'RegistrController'
            }
        }
    }).state('student', {
        url: '/student',
        views: {
            "containerOne": {
                templateUrl: 'View/StudentManagement/Student.html',
                controller: 'StudentController'
            }
        }
    }).state('product', {
        url: '/product',
        views: {
            "containerOne": {
                templateUrl: 'View/ProductManagement/Product.html',
                controller: 'ProductController'
            }
        }
    });

}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {
        return {
            request: function (config) {
                $rootScope.loading = true;
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                $rootScope.loading = false;
                if (response.status == "401") {
                    $location.path('/login');
                }
                //the same response/modified/or a new one need to be returned.  
                return response;
            },
            responseError: function (rejection) {
                if (rejection.status == "401") {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
}]);

app.run(['$rootScope', '$location', '$http', 'AuthData', function ($rootScope, $location, $http, authData) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        if (restrictedPage && !authData.IsAuthenticated) {
            $location.path('/login');
        } else if (!restrictedPage && authData.IsAuthenticated) {
            //$location.path('/home'); // This is unComment  then it is create issue on 401 error redirect
        }
    });
}]);






