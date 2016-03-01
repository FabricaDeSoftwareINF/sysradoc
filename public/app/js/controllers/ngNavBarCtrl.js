angular.module('app').controller('ngNavBarCtrl', function ($scope, ngIdentity, $location, ngAuth, ngNotifier) {
    $scope.identity = ngIdentity;

    $scope.goToHome = function(){
        var url = "/";

        if (ngIdentity.isAuthenticated())
            url = "/dashboard";

        $location.path(url);
    };

    $scope.signout = function () {
        ngAuth.logoutUser().then(function () {
            ngNotifier.notify('Deslogado com sucesso.');
            $location.path('/');
        });
    };
});
