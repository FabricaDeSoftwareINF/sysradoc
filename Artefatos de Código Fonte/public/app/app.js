var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute', 'angularFileUpload']);


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
        manager: {
            auth: function(ngAuth){
                return ngAuth.grantAnyAccessLevelForRoute(['Administrador', 'Secretaria']);
            }
        },
        admin: {
            auth: function (ngAuth) {
                return ngAuth.authorizeCurrentUserForRoute('Administrador');
            }},
        teacher: {
            auth: function (ngAuth) {
                return ngAuth.authorizeCurrentUserForRoute('Professor');
            }},
        user: {
            auth: function (ngAuth) {
                return ngAuth.authorizeAuthenticatedUserForRoute();
            }}
    };

    $routeProvider
            .when('/', {
                templateUrl: '/partials/views/main/main',
                controller: 'ngMainCtrl'
            })
            .when('/recovery', {
                templateUrl: '/partials/views/account/recover-password',
                controller: 'ngRecoverPasswordCtrl'
            })
            .when('/resetPassword', {
                templateUrl: '/partials/views/account/reset-password',
                controller: 'ngResetPasswordCtrl'
            })
            .when('/signup', {
                templateUrl: '/partials/views/account/signup',
                controller: 'ngSignupCtrl'
            })
            .when('/sendRadoc', {
                templateUrl: '/partials/views/deprecated/send-radoc',
                controller: 'ngSendRadocCtrl',
                resolve: {
                    auth: routeRoleChecks.user.auth,
                }
            })
            .when('/newUser', {
                templateUrl: '/partials/views/manager/new-user',
                controller: 'ngNewUserCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
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
