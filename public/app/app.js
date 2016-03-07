var app = angular.module('app', ['autocomplete', 'ui.bootstrap', 'ngResource', 'ngRoute', 'angularFileUpload']);


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
                if (ngAuth.grantAnyAccessLevelForRoute(['Administrador', 'Secretaria']) !== true)
                    return ngAuth.grantAccessLevelForRoute('Professor') && ngAuth.authorizeAnyCurrentUserForRoute(['CAD', 'CD']);

                return true;
            }
        },
        admin: {
            auth: function (ngAuth) {
                return ngAuth.grantAccessLevelForRoute('Administrador');
            }},
        teacher: {
            auth: function (ngAuth) {
                return ngAuth.grantAccessLevelForRoute('Professor');
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
            .when('/dashboard', {
                templateUrl: '/partials/views/dashboard/dashboard',
                controller: 'ngDashboardCtrl',
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
            .when('/allUsers', {
                templateUrl: '/partials/views/manager/all-users',
                controller: 'ngAllUsersCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
            .when('/newProcess', {
                templateUrl: '/partials/views/manager/new-process',
                controller: 'ngNewProcessCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
            .when('/allProcesses', {
                templateUrl: '/partials/views/manager/all-processes',
                controller: 'ngAllProcessesCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
            .when('/myProcesses', {
                templateUrl: '/partials/views/manager/my-processes',
                controller: 'ngMyProcessesCtrl',
                resolve: {
                    auth: routeRoleChecks.teacher.auth,
                }
            })
            .when('/newRequest', {
                templateUrl: '/partials/views/manager/new-request',
                controller: 'ngNewRequestCtrl',
                resolve: {
                    auth: routeRoleChecks.teacher.auth,
                }
            })
            .when('/allRequests', {
                templateUrl: '/partials/views/manager/all-requests',
                controller: 'ngAllRequestsCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
            .when('/myRequests', {
                templateUrl: '/partials/views/manager/my-requests',
                controller: 'ngMyRequestsCtrl',
                resolve: {
                    auth: routeRoleChecks.teacher.auth,
                }
            })
            .when('/sendRadoc', {
                templateUrl: '/partials/views/radoc/send-radoc',
                controller: 'ngSendRadocCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
            .when('/allRadocs', {
                templateUrl: '/partials/views/radoc/all-radocs',
                controller: 'ngAllRadocsCtrl',
                resolve: {
                    auth: routeRoleChecks.manager.auth,
                }
            })
    ;

});

angular.module('app').run(function ($rootScope, $location, ngLayoutSvc) {
    $rootScope.layout = ngLayoutSvc;
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            if ($location.path(""))
                $location.path('/');
        }
    });
});
