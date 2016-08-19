(function () {
    'use strict';
    app.factory('AuthData', ['$window', '$localStorage', function ($window, $localStorage) {
        var authDataFactory = {};
        authDataFactory.IsAuthenticated = false;
        if ($localStorage.userId > 0)
            authDataFactory.IsAuthenticated = true;
        else
            authDataFactory.IsAuthenticated = false;

        authDataFactory.userName = $localStorage.user;
        return authDataFactory;
    }
    ]);
})();