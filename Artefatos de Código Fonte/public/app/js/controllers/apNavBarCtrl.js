angular.module('app').controller('apNavBarCtrl', function ($scope, apIdentity, $location, apAuth, apNotifier) {
    $scope.identity = apIdentity;

    $scope.goToHome = function(){
        var url = "/";

        if (apIdentity.isAuthenticated())
            url = "/dashboard";

        $location.path(url);
    };

    $scope.signout = function () {
        apAuth.logoutUser().then(function () {
            apNotifier.notify('Deslogado com sucesso.');
            $location.path('/');
        });
    };
});
