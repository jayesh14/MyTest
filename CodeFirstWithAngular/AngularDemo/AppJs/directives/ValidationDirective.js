(function () {
    'use strict';
    app.directive('validEmail', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, control) {
                control.$parsers.push(function (viewValue) {
                    var newEmail = control.$viewValue;
                    control.$setValidity("invalidEmail", true);
                    if (typeof newEmail === "object" || newEmail == "") return newEmail;
                    if (!newEmail.match(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/))
                        control.$setValidity("invalidEmail", false);
                    return viewValue;
                });
            }
        };
    });

    app.directive('pwCheck', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var password = "#" + attrs.pwCheck;
                elem.add(password).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(password).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    });

    app.directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])

    app.directive('loading', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="dialog-background">' +
              '<div class="dialog-loading-wrapper">' +
               '<img class="loading" src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" title="LOADING..." />' +
           '</div></div>',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        }
    })
})();