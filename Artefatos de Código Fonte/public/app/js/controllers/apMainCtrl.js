angular.module('app').controller('apMainCtrl', function ($scope, apAuth, apNotifier, apIdentity, $location) {
    $scope.data = {
        login: {
            email: "",
            password: ""
        }
    };

    $scope.identity = apIdentity;

    $scope.signin = function () {
        if ($scope.data.login.email === "" || $scope.data.login.password === ""){
            apNotifier.error('Preencha todos os campos de login.');
            return false;
        }

        apAuth.authenticateUser($scope.data.login.email, $scope.data.login.password).then(function (success) {
            if (success) {
                apNotifier.notify('Usuario logado com sucesso.');
                $location.path('/dashboard');
            } else {
                apNotifier.error('Os dados de login não conferem.');
            }
        });
    };
});
