<<<<<<< HEAD
angular.module('app').controller('apNavBarCtrl', function ($scope, apIdentity, $location) {
=======
angular.module('app').controller('apNavBarCtrl', function ($scope, apIdentity, $location, apAuth, apNotifier) {
    $scope.identity = apIdentity;

>>>>>>> 0ba85180dc8005ec51783b1b0955446661a6281d
    $scope.goToHome = function(){
        var url = "/";

        if (apIdentity.isAuthenticated())
            url = "/dashboard";

        $location.path(url);
    };
<<<<<<< HEAD
=======

    $scope.signout = function () {
        apAuth.logoutUser().then(function () {
            apNotifier.notify('Deslogado com sucesso.');
            $location.path('/');
        });
    };
>>>>>>> 0ba85180dc8005ec51783b1b0955446661a6281d
});
