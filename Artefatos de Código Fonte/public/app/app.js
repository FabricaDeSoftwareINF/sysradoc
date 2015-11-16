var app = angular.module('app', ['ngResource', 'ngRoute']);


app.config(function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  var routeRoleChecks = {
        admin: {
            auth: function (apAuth) {
                return apAuth.authorizeCurrentUserForRoute('admin');
            }},
        teacher: {
            auth: function (apAuth) {
                return apAuth.authorizeCurrentUserForRoute('teacher');
            }},
        user: {
            auth: function (apAuth) {
                return apAuth.authorizeAuthenticatedUserForRoute();
            }}
    };

    $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'apMainCtrl'
            })
            .when('/recovery', {
                templateUrl: '/partials/account/recover-password',
                controller: 'apRecoverPasswordCtrl'
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'apSignupCtrl'
            })
            .when('/login', {
                templateUrl: '/partials/auth/login',
                controller: 'apLoginCtrl'})
            .when('/dashboard', {
                templateUrl: '/partials/dashboard/dashboard',
                controller: 'apDashboardCtrl',
                resolve: {
                    auth: routeRoleChecks.user.auth,
                }
            })
    ;

});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
