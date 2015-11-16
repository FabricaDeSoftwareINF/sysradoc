angular.module('app').controller('apNavBarCtrl', function ($scope, apIdentity, $location) {
    $scope.goToHome = function(){
        var url = "/";

        if (apIdentity.isAuthenticated())
            url = "/dashboard";

        $location.path(url);
    };
});
