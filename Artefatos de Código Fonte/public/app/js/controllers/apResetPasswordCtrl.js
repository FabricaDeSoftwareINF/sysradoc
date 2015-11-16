angular.module('app').controller('apResetPasswordCtrl', function ($scope, apUser, apUserSvc, apNotifier, $location) {
    $scope.data = {
        reset: {
            email: "",
            token: "",
            password: "",
            repeatPassword: "",
            disabledEmail: false,
            disabledToken: false,
        }
    };

    $scope.reset = function(){
        if ($scope.data.reset.email === "" || $scope.data.reset.token === "" || $scope.data.reset.password === ""){
            apNotifier.error('Preencha todos os campos.');
            return false;
        }

        if ($scope.data.reset.password !== $scope.data.reset.repeatPassword){
            apNotifier.error('As senhas não coincidem.');
            return false;
        }

        if($scope.data.reset.password.length < 6){
            apNotifier.error('A senha deve possuir no mínimo 6 caracteres.');
            return false;
        }

        apUserSvc.resetUserPassword($scope.data.reset.email, $scope.data.reset.token, $scope.data.reset.password).then(function (success) {
            apNotifier.notify('Senha redefinida com sucesso!');
            $location.path("/");
        },
        function () {
            apNotifier.error('Não existe um pedido de recuperação para este email, ou a chave está incorreta.');
        });
    };

    var checkUrl = function(){
        var urlParam = $location.search();
        if (!!urlParam.email){
            $scope.data.reset.email = urlParam.email;
            $scope.data.reset.disabledEmail = true;
        }
        if (!!urlParam.token){
            $scope.data.reset.token = urlParam.token;
            $scope.data.reset.disabledToken = true;
        }
    };

    checkUrl();
});
