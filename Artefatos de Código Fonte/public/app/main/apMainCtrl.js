angular.module('app').controller('apMainCtrl', function ($scope, apAuth, apNotifier, apIdentity) {
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
        }

        apAuth.authenticateUser($scope.data.login.email, $scope.data.login.password).then(function (success) {
            if (success) {
                apNotifier.notify('Usuario logado com sucesso.');
            } else {
                apNotifier.error('Os dados de login não conferem.');
            }
        });
    };
});
