angular.module('app').controller('apRecoverPasswordCtrl', function ($scope, apUser, apUserSvc, apNotifier, $location) {
    $scope.data = {
        recovery: {
            email: ""
        }
    };

    $scope.recover = function(){
        if ($scope.data.recovery.email === ""){
            apNotifier.error('Informe um email válido.');
            return false;
        }

        apUserSvc.recoverUserPassword($scope.data.recovery.email).then(function (success) {
            apNotifier.notify('As instruções de recuperação de senha foram enviadas por email.');
            $location.path("/");
        },
        function () {
            apNotifier.error('O email informado não pertence a nenhuma conta.');
        });
    };
});
