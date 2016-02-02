angular.module('app').controller('ngMainCtrl', function ($scope, ngAuth, ngNotifier, ngIdentity, $location) {
    $scope.data = {
        login: {
            email: "",
            password: ""
        }
    };

    $scope.identity = ngIdentity;

    $scope.signin = function () {
        if ($scope.data.login.email === "" || $scope.data.login.password === ""){
            ngNotifier.error('Preencha todos os campos de login.');
            return false;
        }

        ngAuth.authenticateUser($scope.data.login.email, $scope.data.login.password).then(function (success) {
            if (success) {
                ngNotifier.notify('Usuario logado com sucesso.');
                $location.path('/dashboard');
            } else {
                ngNotifier.error('Os dados de login não conferem.');
            }
        });
    };
});
